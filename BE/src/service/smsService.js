import { info, error } from '../utils/logger.js';

const sendSMS = async (to, message) => {
  try {
    // In a real application, you would integrate with a third-party SMS provider here (e.g., Twilio, Nexmo).
    // Example with a placeholder:
    info(`Sending SMS to ${to}: ${message}`);
    // const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.messages.create({
    //   body: message,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: to,
    // });
    info('SMS sent successfully (placeholder)');
    return true;
  } catch (err) {
    error('Error sending SMS (placeholder):', err);
    return false;
  }
};

export default sendSMS;
