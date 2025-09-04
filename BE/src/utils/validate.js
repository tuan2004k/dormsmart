import { body } from 'express-validator';

export const validateRegister = [
    body('username')
        .notEmpty()
        .withMessage('Tên người dùng không được để trống'),
    body('email')
        .isEmail()
        .withMessage('Vui lòng nhập địa chỉ email hợp lệ'),
    body('profile.fullName')
        .notEmpty()
        .withMessage('Họ và tên không được để trống'),
    body('role')
        .isIn(['STUDENT', 'ADMIN', 'STAFF'])
        .withMessage('Vai trò phải là SINH VIÊN, QUẢN TRỊ VIÊN hoặc NHÂN VIÊN'),
    body('profile.phone')
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
