import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (
  email,
  name,
  role,
  phone,
  password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Người dùng đã tồn tại');
  }

  const user = await User.create({
    email,
    name,
    role,
    phone,
    password,
  });

  return user;
};

export const validateUser = async (
  email,
  password) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isMatch = await user.comparePassword(password);
  return isMatch ? user : null;
};

export const login = async (
  email,
  password) => {
  const user = await validateUser(
    email,
    password);
  if (!user) {
    throw new Error('Thông tin xác thực không hợp lệ');
  }
  const payload = {
    email: user.email,
    role: user.role,
    id: user._id
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};