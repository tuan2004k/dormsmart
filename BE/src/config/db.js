
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { info, error } from '../utils/logger.js';

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    info(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      info('MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (err) {
    error(`Error: ${err.message}`);
    process.exit(1); 
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};