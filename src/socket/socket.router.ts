import { Socket } from 'socket.io';
import { app } from '../server';
import { UserSocket } from './interfaces/user.interface';
import { addUser, getUser, removeUser } from './utils/users.utils';
import { generateMessage, generateMessages } from './utils/message.utils';
import { socketConversation } from './utils/conversation.utils';
import { QuestionController } from '@/controllers/question.controller';
import { QuestionService } from '@/services/question.service';
import { AnswerEntity } from '@/entities/answer.entity';
import { AnswerService } from '@/services/answer.service';

const server = app.server;
const io = require('socket.io')(server);

// message qui appartaitra à chaque fois que un nouveau client
// se connecte au serveur
io.on('connection', async (socket: Socket) => {
  // Un client se connecte au serveur
  /*if (Array.isArray(socket.handshake.query.room)) {
    return { error: 'the parameters are not valid' };
  }*/
  const user: UserSocket = addUser({ id: socket.id });
  // permet de créer des room, et de faire rejoindre le client dans la room
  socket.join(user.room);

  const firstSentence = 'Welcome!';

  socket.emit('welcome', generateMessage(firstSentence));
  socketConversation.set(socket.id, [
    {
      message: firstSentence,
      messageType: 'question',
    },
  ]);

  emitQuestion(socket, 1);

  socket.on('sendMessage', async (id: number) => {
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
  });

  // Un client se déconnecte du serveur
  // déclencher un événement quand un client se deconnecte
  socket.on('disconnect', async () => {
    removeUser(socket.id);
    socketConversation.delete(socket.id);
  });
});

export const emitNoMoreQuestion = async (socket: Socket) => {
  socket.emit('noMoreQuestion', socketConversation.get(socket.id));
};

export const emitQuestion = async (socket: Socket, questionId: number) => {
  const questionService = new QuestionService();
  const question = await questionService.findQuestionById(questionId);
  socket.emit('question', question);
  registerQuestion(socket, question.title);
};

export const registerQuestion = (socket: Socket, question: string) => {
  if (!socketConversation.has(socket.id))
    socket.emit('messageProblem', 'votre conversation a eu un probleme');
  socketConversation.get(socket.id).push({
    message: question,
    messageType: 'question',
  });
};

export const registerAnswer = (socket: Socket, answer: string) => {
  if (!socketConversation.has(socket.id))
    socket.emit('messageProblem', 'votre conversation a eu un probleme');
  socketConversation.get(socket.id).push({
    message: answer,
    messageType: 'answer',
  });
};

export { server };
