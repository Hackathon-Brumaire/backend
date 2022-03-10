import { UserSocket } from '../interfaces/user.interface';

const users: UserSocket[] = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = (userProps: { id: string; roomId: number; username: string }): UserSocket => {
  // Store user
  const user: UserSocket = { id: userProps.id, roomId: userProps.roomId, username: userProps.username };
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

const getUsersInRoom = (roomId: number): UserSocket[] => {
  return users.filter(user => user.roomId === roomId);
};

const getNumberUsersInRoom = (roomId: number): number => {
  return users.filter(user => user.roomId === roomId).length;
};

export { addUser, getUser, removeUser, getNumberUsersInRoom };
