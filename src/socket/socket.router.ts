import { Socket } from 'socket.io';
import { app } from '../server';
import { UserSocket } from './interfaces/user.interface';
import {
  addUser,
  getNumberUsersInRoom,
  getUser,
  removeUser,
} from './utils/users.utils';
import { generateMessage } from './utils/message.utils';
import { socketConversation } from './utils/conversation.utils';
import { QuestionService } from '@/services/question.service';
import { AnswerService } from '@/services/answer.service';
import { RoomService } from '@/services/room.service';
import UserService from '@/services/users.service';
import { ConversationHistoryService } from '@/services/conversation-history.service';
import { ConversationHistoryEntity } from '@/entities/conversation-history.entity';
import { title } from 'process';

const server = app.server;
const io = require('socket.io')(server);

let count = 0;

// message qui appartaitra à chaque fois que un nouveau client
// se connecte au serveur
io.on('connection', async (socket: Socket) => {
  // Un client se connecte au serveur
  const roomService = new RoomService();
  if (Array.isArray(socket.handshake.query.room)) {
    const roomId = socket.handshake.query.room[0];
    if (
      roomService.getRoom({ id: Number.parseInt(roomId), status: 'alive' }) &&
      getNumberUsersInRoom(Number.parseInt(roomId)) < 2
    ) {
      const user: UserSocket = addUser({
        id: socket.id,
        roomId: Number.parseInt(roomId),
        username: 'admin',
      });
      socket.join(user.roomId.toString());
    } else {
      socket.emit('messageProblem', 'votre conversation a eu un probleme');
    }
  } else {
    const room = await roomService.createRoom('alive');
    //console.log(room);
    const user: UserSocket = addUser({
      id: socket.id,
      roomId: room.id,
      username: 'jean-' + count,
    });
    socket.join(user.roomId.toString());
  }
  // permet de créer des room, et de faire rejoindre le client dans la room

  const firstSentence = 'Welcome!';

  socket.emit('welcome', generateMessage(firstSentence));
  socketConversation.set(socket.id, [
    {
      message: firstSentence,
      messageType: 'question',
      createdAt: new Date().getTime(),
    },
  ]);
  //console.log('avant');
  await saveConversationHistory(socket);
  //console.log('après');

  emitQuestion(socket, 1);

  socket.on('sendMessage', async (data: string) => {
    const user = getUser(socket.id);
    if (getNumberUsersInRoom(user.roomId) === 1) {
      sendMessageOnOneUser(socket, Number.parseInt(data));
    } else {
      sendMessageOnMultipleUser(socket, data);
    }
  });

  // Un client se déconnecte du serveur
  // déclencher un événement quand un client se deconnecte
  socket.on('disconnect', async () => {
    const user = getUser(socket.id);
    const roomId = user.roomId;
    const roomService: RoomService = new RoomService();
    const room = await roomService.getRoom({ id: roomId, status: 'alive' });
    await roomService.deleteRoom({
      id: room.id,
      status: room.status as 'alive' | 'dead',
    });
    removeUser(socket.id);
    socketConversation.delete(socket.id);
    deleteConversationHistory(socket);
  });
});

export const isFixed = async (socket: Socket) => {
  const questionService = new QuestionService();
  const question = await questionService.findQuestionById(35);
  socket.emit('isFixed', question);
};

export const emitNoMoreQuestion = async (socket: Socket) => {
  socket.emit('noMoreQuestion', socketConversation.get(socket.id));
};

export const emitQuestion = async (socket: Socket, questionId: number) => {
  const questionService = new QuestionService();
  const question = await questionService.findQuestionById(questionId);
  let questionReturn;
  if (question.nextAnswers.length > 0) {
    const nextAnswers: {
      id: number;
      title: string;
      nextAnswers: { id: Number; title: string; doc?: string }[];
    } = question.nextAnswers.map(answerEntity => ({
      ...answerEntity,
      doc: answerEntity.doc !== null ? answerEntity.doc.link : null,
    }));

    questionReturn = { ...question, nextAnswers };
  } else {
    questionReturn = question;
  }
  socket.emit('question', questionReturn);
  registerQuestion(socket, question.title);
};

export const registerQuestion = async (socket: Socket, question: string) => {
  if (!socketConversation.has(socket.id))
    socket.emit('messageProblem', 'votre conversation a eu un probleme');
  socketConversation.get(socket.id).push({
    message: question,
    messageType: 'question',
    createdAt: new Date().getTime(),
  });
  updateConversationHistory(socket);
};

export const updateConversationHistory = async (socket: Socket) => {
  const user = getUser(socket.id);
  //console.log(socket.id);
  //console.log(socketConversation.get(socket.id));
  const conversationHistoryService = new ConversationHistoryService();
  const conversation = await conversationHistoryService.getFromRoomId(
    user.roomId.toString(),
  );
  conversation.conversationHistorics = JSON.stringify(
    socketConversation.get(socket.id),
  );

  conversation.save();
};

export const saveConversationHistory = async (socket: Socket) => {
  const user = getUser(socket.id);
  const conversationHistoryService = new ConversationHistoryService();
  const conversationHistorics = JSON.stringify(
    socketConversation.get(socket.id),
  );
  //console.log(conversationHistorics);
  return await conversationHistoryService.createConversation(
    user.roomId.toString(),
    conversationHistorics,
  );
};

export const deleteConversationHistory = async (socket: Socket) => {
  const user = getUser(socket.id);
  const conversationHistoryService = new ConversationHistoryService();
  const conversation = await conversationHistoryService.getFromRoomId(
    user.roomId.toString(),
  );

  await conversation.remove();
};

export const registerAnswer = (socket: Socket, answer: string) => {
  if (!socketConversation.has(socket.id))
    socket.emit('messageProblem', 'votre conversation a eu un probleme');
  socketConversation.get(socket.id).push({
    message: answer,
    messageType: 'answer',
    createdAt: new Date().getTime(),
  });
  updateConversationHistory(socket);
};

export const sendMessageOnOneUser = async (socket: Socket, id: number) => {
  const user = getUser(socket.id);
  const answerService = new AnswerService();
  const anwser = await answerService.findAnswerById(id);
  const nextQuestion = await answerService.findAnswerNextQuestion(anwser.id);
  registerAnswer(socket, anwser.title);
  if (nextQuestion === null) {
    emitNoMoreQuestion(socket);
    return;
  }

  emitQuestion(socket, nextQuestion.id);
};

export const sendMessageOnMultipleUser = async (
  socket: Socket,
  message: string,
) => {
  const user = getUser(socket.id);
  if (user.username === 'admin') {
    registerQuestion(socket, message);
  } else {
    registerAnswer(socket, message);
  }

  io.to(user.roomId).emit('question', {
    id: 123,
    title: message,
    nextAnswers: [],
    media: null,
  });
};

export { server };
