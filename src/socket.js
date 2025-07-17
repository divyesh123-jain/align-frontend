import { io } from 'socket.io-client';

const SOCKET_URL = 'https://asign-backend.railway.internal';

export const socket = io(SOCKET_URL);