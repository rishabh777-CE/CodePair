import { io } from "socket.io-client";

export const initSocket = async (roomId) => {
  const options = {
    'force new connection': true,
    reconnectionAttempt: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  };

  const socket = io(process.env.REACT_APP_BACKEND_URL, options);

  return socket;
};