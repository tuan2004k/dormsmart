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
import userRoutes from './src/routes/user.Routes.js'
import cors from 'cors';
import { swaggerUi, swaggerDocs } from './src/docs/swagger.js';
import dotenv from 'dotenv';
import limiter from './src/middleware/rateLimitMiddleware.js';
import cache from './src/middleware/cacheMiddleware.js'; 
import { createServer } from 'http'; 
import { Server } from 'socket.io'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeSocketIo } from './src/utils/socket.js'; 
import { info, error } from './src/utils/logger.js';
import reportRoutes from './src/routes/report.Routes.js'; 

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

app.use(express.json());
info('Server: express.json() middleware applied');
app.use(cors());
info('Server: cors() middleware applied');

connectDB();
connectRedis();
initializeSocketIo(); 
info('Server: Database, Redis, and Socket.IO initialization complete');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
info('Server: Swagger UI middleware applied');
info('Server: Rate limiter middleware (temporarily disabled)');


app.use('/api/buildings', buildingRoutes); 


app.use('/api/auth', authRoutes);
info('Server: Auth routes applied');
app.use('/api', studenRoutes);
info('Server: Student routes applied');
app.use('/api', roomRoutes);
info('Server: Room routes applied');
app.use('/api', buildingRoutes);
info('Server: Building routes applied');
app.use('/api', contractRoutes);
info('Server: Contract routes applied');
app.use('/api', paymentRoutes);
info('Server: Payment routes applied');
app.use('/api', requestRoutes);
info('Server: Request routes applied');
app.use('/api', uploadRoutes);
info('Server: Upload routes applied');
app.use('/api', userRoutes);
info('Server: User routes applied');
app.use('/api', reportRoutes);
info('Server: Report routes applied');

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

// General error handling middleware
app.use((err, req, res, next) => {
  error('Unhandled Error:', err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export { io }; // Export io for use in other modules