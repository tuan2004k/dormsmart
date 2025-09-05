import express from 'express';
import * as userController from '../controllers/user.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import upload from '../config/multerConfig.js'; // Import multer upload middleware

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users (Admin only)
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [STUDENT, ADMIN, STAFF]
 *                 example: "STUDENT"
 *               profile:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "New User"
 *                   phone:
 *                     type: string
 *                     example: "0123456789"
 *                   avatar:
 *                     type: string
 *                     format: binary
 *                     description: User avatar image file
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/users', [protect, authorize(['ADMIN']), upload.single('avatar')], userController.create);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/users', [protect, authorize(['ADMIN'])], userController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/users/:id', [protect, authorize(['ADMIN'])], userController.getById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "updated.user"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "updateduser@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "newpassword123"
 *               role:
 *                 type: string
 *                 enum: [STUDENT, ADMIN, STAFF]
 *                 example: "STAFF"
 *               profile:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "Updated User Name"
 *                   phone:
 *                     type: string
 *                     example: "0987654321"
 *                   avatar:
 *                     type: string
 *                     format: binary
 *                     description: User avatar image file
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.put('/users/:id', [protect, authorize(['ADMIN']), upload.single('avatar')], userController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', [protect, authorize(['ADMIN'])], userController.remove);

export default router;
