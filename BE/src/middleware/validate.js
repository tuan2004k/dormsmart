import { body } from 'express-validator';

export const validateRegister = [
    body('email')
        .isEmail()
        .withMessage('Vui lòng nhập địa chỉ email hợp lệ'),
    body('name')
        .notEmpty()
        .withMessage('Tên không được để trống'),
    body('role')
        .isIn(['STUDENT', 'ADMIN'])
        .withMessage('Vai trò phải là SINH VIÊN hoặc QUẢN TRỊ VIÊN'),
    body('phone')
        .isMobilePhone('any')
        .withMessage('Vui lòng nhập số điện thoại hợp lệ'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
];

export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Vui lòng nhập địa chỉ email hợp lệ'),
    body('password')
        .notEmpty()
        .withMessage('Mật khẩu không được để trống'),
];
