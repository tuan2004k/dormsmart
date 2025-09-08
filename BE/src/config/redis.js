import { createClient } from 'redis';
import dotenv from 'dotenv';
import { info, error } from '../utils/logger.js';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  // Add retry strategy for a more robust connection
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 20) { // Limit retry attempts
        error('Redis: Too many retry attempts. Connection failed.');
        return new Error('Too many retries.');
      }
      info(`Redis: Retrying connection attempt ${retries}...`);
      return Math.min(retries * 50, 1000); // Exponential backoff up to 1 second
    }
  }
});

redisClient.on('connect', () => info('Redis client connected'));
redisClient.on('error', (err) => error('Redis Client Error', err));

const connectRedis = async () => {
  if (!redisClient.isReady) {
    try {
      await redisClient.connect();
      info('Redis client successfully connected and ready.');
    } catch (err) {
      error('Failed to connect to Redis:', err);
      // It's important not to exit here, let the retry strategy handle it or let the app continue with degraded functionality
    }
  }
};

export { redisClient, connectRedis };
