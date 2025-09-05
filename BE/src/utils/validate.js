import { body } from 'express-validator';

export const validateRegister = [
    body('username')
        .notEmpty()
        .withMessage('Tên người dùng không được để trống'),
    body('email')
        .isEmail()
        .withMessage('Vui lòng nhập địa chỉ email hợp lệ'),
    // Validate fullName: check top-level or nested in profile
    body(['fullName', 'profile.fullName'])
        .custom((value, { req }) => {
            // Check if either top-level fullName or profile.fullName exists
            if (req.body.fullName || (req.body.profile && req.body.profile.fullName)) {
                return true;
            }
            throw new Error('Họ và tên không được để trống');
        }),
    body('role')
        .isIn(['STUDENT', 'ADMIN', 'STAFF'])
        .withMessage('Vai trò phải là SINH VIÊN, QUẢN TRỊ VIÊN hoặc NHÂN VIÊN'),
    // Validate phone: check top-level or nested in profile
    body(['phone', 'profile.phone'])
        .custom((value, { req }) => {
            // Check if either top-level phone or profile.phone exists and is a valid phone number
            const phone = req.body.phone || (req.body.profile && req.body.profile.phone);
            if (phone && /^[0-9]{10,11}$/.test(phone)) { // Basic regex for 10-11 digits
                return true;
            }
            throw new Error('Vui lòng nhập số điện thoại hợp lệ');
        }),
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
