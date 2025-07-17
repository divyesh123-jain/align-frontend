import { io } from 'socket.io-client';

const SOCKET_URL = 'https://asign-backend-production.up.railway.app'

export const socket = io(SOCKET_URL);