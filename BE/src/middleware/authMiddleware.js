import User from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';
import { info, error } from '../utils/logger.js';

export const protect = async (req, res, next) => {
  info('AuthMiddleware: protect method called');
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Không có token được cung cấp' });
  }
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tìm thấy' });
    }

    req.user = user;

    next();
  } catch (err) {
    error(`AuthMiddleware: Error during token verification or user lookup: ${err.message}`);
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};