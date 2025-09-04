import User from '../models/User.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import sendEmail from './emailService.js'; 
import dotenv from 'dotenv'; 

dotenv.config(); 

export const register = async (
  username,
  email,
  fullName, 
  role,
  phone,
  password,
  avatar) => { 
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Người dùng đã tồn tại');
  }

  const user = await User.create({
    username,
    email,
    profile: {
      fullName,
      phone,
      avatar,
    },
    role,
    password,
  });

  // Send welcome email
  const subject = 'Chào mừng bạn đến với Hệ thống quản lý ký túc xá!';
  const htmlContent = `
    <h1>Chào mừng, ${fullName}!</h1>
    <p>Cảm ơn bạn đã đăng ký tài khoản tại hệ thống của chúng tôi.</p>
    <p>Thông tin đăng nhập của bạn:</p>
    <ul>
      <li>Email: ${email}</li>
      <li>Tên người dùng: ${username}</li>
    </ul>
    <p>Bạn có thể đăng nhập tại đây: <a href="http://yourfrontend.com/login">Đăng nhập</a></p>
    <p>Trân trọng,</p>
    <p>Đội ngũ quản lý ký túc xá</p>
  `;
  await sendEmail(email, subject, htmlContent);

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
  return { token: generateToken(payload), user }; 
};

export const refreshToken = async (oldToken) => {
  try {
    const decoded = verifyToken(oldToken);
    if (!decoded) {
      throw new Error('Invalid or expired token');
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }

    const newPayload = {
      email: user.email,
      role: user.role,
      id: user._id
    };
    return generateToken(newPayload);
  } catch (error) {
    throw new Error(`Error refreshing token: ${error.message}`);
  }
};