import { register, login, refreshToken } from '../service/authservice.js';
import { body, validationResult } from 'express-validator';
import { validateRegister, validateLogin } from '../utils/validate.js';
import upload from '../config/multerConfig.js';
import { emitNotification } from '../utils/socket.js'; // Import emitNotification
import { info, error } from '../utils/logger.js'; // Import info and error logger

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

      const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

      const user = await register(
        username,
        email,
        fullName,
        role,
        phone,
        password,
        avatar);

      res.status(201).json(
        {
          message: 'Người dùng đã đăng ký',
          user: {
            username: user.username,
            email,
            fullName: user.profile.fullName,
            role,
            avatar: user.profile.avatar
          }
        });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    info('AuthController: login method called');
    try {
      info('AuthController: Validating request body...');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        info('AuthController: Validation failed, sending 400');
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        email,
        password
      } = req.body;
      info('AuthController: Calling authService.login...');
      const { token, user } = await login(
        email,
        password);

      info(`AuthController: Login successful for user ${user._id}, emitting notification...`);
      emitNotification(user._id.toString(), 'loginSuccess',
        { message: 'Bạn đã đăng nhập thành công!', userId: user._id });
      info('AuthController: Notification emitted, sending response...');

      res.json({
        message: 'Đăng nhập thành công',
        token,
        userId: user._id,
        role: user.role
      });
      info('AuthController: Login response sent.');
    } catch (err) {
      error(`AuthController: Error during login: ${err.message}`);
      res.status(401).json({ message: err.message });
    }
  },

  async refresh(req, res) {
    try {
      const oldToken = req.headers['authorization']?.split(' ')[1];
      if (!oldToken) {
        return res.status(401).json({ message: 'No token provided' });
      }
      const newToken = await refreshToken(oldToken);
      res.json({
        message: 'Token refreshed successfully',
        token: newToken
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

export default authController;