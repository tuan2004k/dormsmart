import { redisClient } from '../config/redis.js';
import { info } from '../utils/logger.js';

const cache = (req, res, next) => {
  const key = req.originalUrl;

  redisClient.get(key, (err, data) => {
    if (err) {
      info(`Redis error for key ${key}: ${err.message}`);
      return next();
    }
    if (data !== null) {
      info(`Cache hit for ${key}`);
      res.send(JSON.parse(data));
    } else {
      info(`Cache miss for ${key}`);
      res.sendResponse = res.send;
      res.send = (body) => {
        redisClient.setEx(key, 3600, JSON.stringify(body)); // Cache for 1 hour
        res.sendResponse(body);
      };
      next();
    }
  });
};

export default cache;
