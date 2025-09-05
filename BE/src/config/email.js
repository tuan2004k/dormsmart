import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { error, info } from '../utils/logger.js';

dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: process.env.EMAIL_SECURE === 'true', // Use 'true' or 'false'
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify((err, success) => {
//   if (err) {
//     error('Email transporter verification failed:', err);
//   } else {
//     info('Email transporter is ready to send messages');
//   }
// });

// export default transporter;

// Temporarily disabling email functionality as requested
const transporter = null; // Set to null or a dummy object if needed to prevent errors where it's imported
export default transporter;
