import { body } from 'express-validator';

export const validateRegister = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('name').notEmpty().withMessage('Name is required'),
    body('role').isIn(['STUDENT', 'ADMIN']).withMessage('Role must be STUDENT or ADMIN'),
    body('phone').isMobilePhone('any').withMessage('Please enter a valid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];
