
import User from '../models/User.js';
import { verifyToken } from '../utils/jwt.js'; 

export const protect = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Không có token được cung cấp' });
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
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' }); 
  }
};