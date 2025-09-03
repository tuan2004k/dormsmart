import { register, login } from '../service/authservice.js';
import { body, validationResult } from 'express-validator';
import { validateRegister,validateLogin } from '../utils/validate.js';

const authController = {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        email,
        name,
        role,
        phone,
        password } = req.body;
      const user = await register(
        email,
        name,
        role,
        phone,
        password);
      res.status(201).json(
        {
          message: 'Người dùng đã đăng ký',
          user: {
            email,
            name,
            role
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
        password } = req.body;
      const token = await login(
        email,
        password);
      res.json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

export default authController;