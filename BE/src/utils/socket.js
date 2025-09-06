import { io } from '../../server.js';
import { info, error } from './logger.js';

const emitNotification = (userId, type, payload) => {
  // In a real application, you might want to store notifications in a database
  // and only send real-time updates for new notifications.
  info(`Emitting notification to user ${userId}: ${type} with payload ${JSON.stringify(payload)}`);
  io.to(userId).emit('notification', { type, payload, timestamp: new Date() });
};

const initializeSocketIo = () => {
  io.on('connection', (socket) => {
    info('A user connected via WebSocket', socket.id);

    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      info(`User ${socket.id} joined room ${userId}`);
    });

    socket.on('disconnect', () => {
      info('A user disconnected from WebSocket', socket.id);
    });

    socket.on('error', (err) => {
      error('Socket error:', err);
    });
  });

  info('Socket.IO initialized and listening for connections.');
};

export { emitNotification, initializeSocketIo };
