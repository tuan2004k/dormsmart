// src/routes/auth.js
import express from 'express';
import authController from '../controllers/auth.Controllers.js';
import { validateRegister, validateLogin } from '../utils/validate.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

router.post(
  '/register',
  validateRegister,
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - name
   *               - role
   *               - phone
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               name:
   *                 type: string
   *               role:
   *                 type: string
   *                 enum: [STUDENT, ADMIN]
   *               phone:
   *                 type: string
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     email:
   *                       type: string
   *                     name:
   *                       type: string
   *                     role:
   *                       type: string
   *       400:
   *         description: Invalid input or user already exists
   */
  authController.register
);

router.post(
  '/login',
  validateLogin,
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Log in a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 token:
   *                   type: string
   *       401:
   *         description: Invalid credentials
   */
  authController.login
);
router.get('/admin-only', [protect, authorize(['ADMIN'])], (req, res) => {
  /**
   * @swagger
   * /api/auth/admin-only:
   *   get:
   *     summary: Access admin-only information
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Admin access granted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       401:
   *         description: Unauthorized, token missing or invalid
   *       403:
   *         description: Forbidden, user is not an Admin
   */
  res.json({ message: 'Chào ADMIN! Bạn có quyền truy cập.' });
});

router.get('/student-info', [protect, authorize(['STUDENT', 'ADMIN'])], (req, res) => {
  /**
   * @swagger
   * /api/auth/student-info:
   *   get:
   *     summary: Get student information
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Student information retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                     email:
   *                       type: string
   *                     name:
   *                       type: string
   *                     role:
   *                       type: string
   *       401:
   *         description: Unauthorized, token missing or invalid
   *       403:
   *         description: Forbidden, user is not a Student or Admin
   */
  res.json({ message: 'Thông tin dành cho sinh viên hoặc admin.', user: req.user });
});


router.post('/logout', protect, (req, res) => {
  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     summary: Log out a user
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       401:
   *         description: Unauthorized, token missing or invalid
   */
  res.json({
    message: 'Đăng xuất thành công '
  });
});
export default router;