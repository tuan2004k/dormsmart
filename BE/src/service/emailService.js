import transporter from '../config/email.js';
import { info, error } from '../utils/logger.js';

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    info('Email sent:', info.messageId);
    return true;
  } catch (err) {
    error('Error sending email:', err);
    return false;
  }
};

export default sendEmail;
