import { createClient } from 'redis';
import dotenv from 'dotenv';
import { info, error } from '../utils/logger.js';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('connect', () => info('Redis client connected'));
redisClient.on('error', (err) => error('Redis Client Error', err));

const connectRedis = async () => {
  if (!redisClient.isReady) {
    await redisClient.connect();
  }
};

export { redisClient, connectRedis };
