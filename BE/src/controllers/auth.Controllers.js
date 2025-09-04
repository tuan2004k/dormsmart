import { register, login, refreshToken } from '../service/authservice.js'; // Import refreshToken
import { body, validationResult } from 'express-validator';
import { validateRegister, validateLogin } from '../utils/validate.js';
import upload from '../config/multerConfig.js'; // Import multer upload middleware
import { emitNotification } from '../utils/socket.js'; // Import emitNotification

const authController = {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        username,
        email,
        fullName,
        role,
        phone,
        password
      } = req.body;

      const avatar = req.file ? `/uploads/${req.file.filename}` : undefined; // Get avatar path if file uploaded

      const user = await register(
        username,
        email,
        fullName,
        role,
        phone,
        password,
        avatar); // Pass avatar to register service

      res.status(201).json(
        {
          message: 'Người dùng đã đăng ký',
          user: {
            username: user.username,
            email,
            fullName: user.profile.fullName,
            role,
            avatar: user.profile.avatar // Include avatar in the response
          }
        });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        email,
        password
      } = req.body;
      const { token, user } = await login(
        email,
        password);

      // Emit a WebSocket notification to the user to join their room
      emitNotification(user._id.toString(), 'loginSuccess', { message: 'Bạn đã đăng nhập thành công!', userId: user._id });

      res.json({ message: 'Đăng nhập thành công', token, userId: user._id, role: user.role });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  async refresh(req, res) {
    try {
      const oldToken = req.headers['authorization']?.split(' ')[1];
      if (!oldToken) {
        return res.status(401).json({ message: 'No token provided' });
      }
      const newToken = await refreshToken(oldToken);
      res.json({ message: 'Token refreshed successfully', token: newToken });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

export default authController;