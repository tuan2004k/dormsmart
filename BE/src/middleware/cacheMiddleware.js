import { redisClient } from '../config/redis.js';
import { info, error } from '../utils/logger.js'; 

const cache = (req, res, next) => {
  const key = req.originalUrl;

  if (!redisClient || !redisClient.isReady) {
    // info('Redis client not ready, skipping cache.');
    return next();
  }

  redisClient.get(key, (err, data) => {
    if (err) {
      error(`Redis GET error for key ${key}: ${err.message}`); 
      return next(); 
    }
    if (data !== null) {
      info(`Cache hit for ${key}`);
      try {
        res.send(JSON.parse(data));
      } catch (parseError) {
        error(`Error parsing cached data for ${key}: ${parseError.message}`);
        next(); 
      }
    } else {
      info(`Cache miss for ${key}`);
      res.sendResponse = res.send;
      res.send = (body) => {
        try {

          if (res.statusCode >= 200 && res.statusCode < 300) {
            redisClient.setEx(key, 3600, JSON.stringify(body), (setExErr) => {
              if (setExErr) {
                error(`Redis SETEX error for key ${key}: ${setExErr.message}`);
              }
            });
            // info(`Cached data for ${key}`);
          }
        } catch (cacheError) {
          error(`Error during cache set for ${key}: ${cacheError.message}`);
        }
        res.sendResponse(body);
      };
      next();
    }
  });
};

export default cache;
