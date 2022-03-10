import { Socket } from 'socket.io';
import { app } from '../server';
import { UserSocket } from './interfaces/user.interface';
import { addUser, getUser, removeUser } from './utils/users.utils';
import { generateMessage, generateMessages } from './utils/message.utils';
import { socketConversation } from './utils/conversation.utils';

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

  //socket.emit('welcome', generateMessage('Welcome !'))

  // pour envoyer un message à tous les utilisateurs sauf l'utilisateur
  // qui vient de se connecter donc celui qui correspond à Socket
  //socket.broadcast.emit('welcome', generateMessage('A new User has joined!'))

  //on setup un callback pour l'accusé de réception coté client pour SendMessage
  socket.on('sendMessage', async (message: string) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('messageUpdated', generateMessage(message));
    }
  });

  socket.on('sendMessages', async (answer: string) => {
    const user = getUser(socket.id);
    const question = 'que voulez vous ?';

    if (!socketConversation.has(socket.id))
      io.to(user.room).emit(
        'messageProblem',
        'votre conversation a eu un probleme',
      );
    socketConversation.get(socket.id).push({
      message: answer,
      messageType: 'answer',
    });
    socketConversation.get(socket.id).push({
      message: question,
      messageType: 'question',
    });

    if (user) {
      io.to(user.room).emit('messageUpdated', {
        question,
        answer: [
          'je suis le choix 1',
          'je suis le choix 2',
          'je suis le choix 3',
        ],
      });
    }
  });

  // Un client se déconnecte du serveur
  // déclencher un événement quand un client se deconnecte
  socket.on('disconnect', async () => {
    removeUser(socket.id);
    socketConversation.delete(socket.id);
  });
});

export { server };
