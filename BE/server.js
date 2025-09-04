import express from 'express';
import { connectDB } from './src/config/db.js';
import { connectRedis } from './src/config/redis.js'; // Import connectRedis
import authRoutes from './src/routes/auth.Routes.js';
import studenRoutes from './src/routes/student.Routes.js'
import roomRoutes from './src/routes/room.Routes.js'
import buildingRoutes from './src/routes/building.Routes.js'
import contractRoutes from './src/routes/contract.Routes.js'
import paymentRoutes from './src/routes/payment.Routes.js'
import requestRoutes from './src/routes/request.Routes.js'
import uploadRoutes from './src/routes/upload.Routes.js'
import userRoutes from './src/routes/user.Routes.js' // Import userRoutes
import cors from 'cors';
import { swaggerUi, swaggerDocs } from './src/docs/swagger.js';
import dotenv from 'dotenv';
import limiter from './src/middleware/rateLimitMiddleware.js'; // Import rate limiter
import cache from './src/middleware/cacheMiddleware.js'; // Import cache middleware
import { createServer } from 'http'; // Import createServer
import { Server } from 'socket.io'; // Import Server from socket.io
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeSocketIo } from './src/utils/socket.js'; // Import initializeSocketIo
import { info, error } from './src/utils/logger.js'; // Import info and error
import reportRoutes from './src/routes/report.Routes.js'; // Import report routes

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = new Server(httpServer, { // Initialize socket.io
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow frontend to connect
    methods: ['GET', 'POST']
  }
});

app.use(express.json());
app.use(cors());

connectDB();
connectRedis(); // Connect to Redis
initializeSocketIo(); // Initialize Socket.IO

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', limiter); // Apply rate limiter

// Apply cache middleware to specific GET routes
app.use('/api/rooms', cache, roomRoutes);
app.use('/api/buildings', cache, buildingRoutes);
app.use('/api/students', cache, studenRoutes);
app.use('/api/contracts', cache, contractRoutes);
app.use('/api/payments', cache, paymentRoutes);
app.use('/api/requests', cache, requestRoutes);

app.use('/api/auth', authRoutes);
// app.use('/api', studenRoutes); // Moved above
// app.use('/api', roomRoutes); // Moved above
// app.use('/api', buildingRoutes); // Moved above
// app.use('/api', contractRoutes); // Moved above
// app.use('/api', paymentRoutes); // Moved above
// app.use('/api', requestRoutes); // Moved above
app.use('/api', uploadRoutes);
app.use('/api', userRoutes); // Use userRoutes
app.use('/api', reportRoutes); // Use reportRoutes

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Socket.io connection handling
// io.on('connection', (socket) => {
//   info('A user connected via WebSocket');

//   socket.on('disconnect', () => {
//     info('A user disconnected from WebSocket');
//   });

//   // Example: Listen for custom events
//   socket.on('sendMessage', (message) => {
//     info('Message received:', message);
//     io.emit('receiveMessage', message); // Broadcast message to all connected clients
//   });
// });

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export { io }; // Export io for use in other modules