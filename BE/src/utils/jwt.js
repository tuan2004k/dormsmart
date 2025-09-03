// src/utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateToken = (payload, secret, options = { expiresIn: '1h' }) =>
  jwt.sign(payload, secret, options);

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};