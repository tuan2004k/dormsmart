import { redisClient } from '../config/redis.js';
import { info, error } from '../utils/logger.js'; // Import error from logger

const cache = (req, res, next) => {
  const key = req.originalUrl;

  // Ensure redisClient is connected before attempting to use it
  if (!redisClient || !redisClient.isReady) {
    info('Redis client not ready, skipping cache.');
    return next();
  }

  redisClient.get(key, (err, data) => {
    if (err) {
      error(`Redis error for key ${key}: ${err.message}`); // Use error logger
      return next(); // Proceed to next middleware/route handler on error
    }
    if (data !== null) {
      info(`Cache hit for ${key}`);
      try {
        res.send(JSON.parse(data));
      } catch (parseError) {
        error(`Error parsing cached data for ${key}: ${parseError.message}`);
        next(); // Proceed if cached data is corrupted
      }
    } else {
      info(`Cache miss for ${key}`);
      res.sendResponse = res.send;
      res.send = (body) => {
        try {
          // Only cache if the response status is 2xx
          if (res.statusCode >= 200 && res.statusCode < 300) {
            redisClient.setEx(key, 3600, JSON.stringify(body)); // Cache for 1 hour
            info(`Cached data for ${key}`);
          }
        } catch (cacheError) {
          error(`Error caching data for ${key}: ${cacheError.message}`);
        }
        res.sendResponse(body);
      };
      next();
    }
  });
};

export default cache;
