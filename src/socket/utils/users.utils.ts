import { UserSocket } from '../interfaces/user.interface';

const users: UserSocket[] = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id }): UserSocket => {
  const room = id;

  // Store user
  const user = { id, room };
  users.push(user);
  return user;
};

const removeUser = (id): void => {
  // findIndex cherchera tant qu'il reste des users et s'arrétera quand elle retournera true
  // et on récupère l'index de la ligne qui est égale à true
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    users.splice(index, 1)[0];
  }
};

const getUser = (id): UserSocket => {
  return users.find(user => user.id === id);
};

const getUsersInRoom = (room: string): UserSocket[] => {
  return users.filter(user => user.room === room);
};

export { addUser, getUser, removeUser };
