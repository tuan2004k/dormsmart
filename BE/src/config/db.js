
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { info, error } from '../utils/logger.js';

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove useCreateIndex and useFindAndModify if using Mongoose 6.x or later
      // useCreateIndex: true, 
      // useFindAndModify: false,
    });
    info(`MongoDB Connected: ${conn.connection.host}`);

    // Add connection event listeners for better debugging
    mongoose.connection.on('error', (err) => {
      error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      info('MongoDB disconnected. Attempting to reconnect...');
      // Optionally implement reconnection logic here
    });

  } catch (err) {
    error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};