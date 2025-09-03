// src/routes/students.js
import express from 'express';
import studentController from '../controllers/student.Controllers.js';
import { protect} from '../middleware/authMiddleware.js'; 
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - studentId
 *               - fullName
 *             properties:
 *               userId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "507f1f77bcf86cd799439011"
 *                 description: ID of the user
 *               studentId:
 *                 type: string
 *                 example: "SV001"
 *                 description: Unique student ID
 *               fullName:
 *                 type: string
 *                 example: "Nguyen Van A"
 *                 description: Full name of the student
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *                 description: Date of birth
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 example: "Male"
 *                 description: Gender
 *               roomId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "507f1f77bcf86cd799439012"
 *                 description: ID of the assigned room
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     studentId:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     dateOfBirth:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     roomId:
 *                       type: string
 *       400:
 *         description: Validation error or bad request
 *       403:
 *         description: Forbidden (not admin)
 *       401:
 *         description: Unauthorized (no token or invalid token)
 */
router.post('/students', [protect, authorize(['ADMIN'])], studentController.create);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the student to retrieve
 *     responses:
 *       200:
 *         description: Student details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     studentId:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     dateOfBirth:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     roomId:
 *                       type: string
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized (no token or invalid token)
 */
router.get('/students/:id', protect, studentController.getById);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       studentId:
 *                         type: string
 *                       fullName:
 *                         type: string
 *                       dateOfBirth:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       roomId:
 *                         type: string
 *       403:
 *         description: Forbidden (not admin)
 *       401:
 *         description: Unauthorized (no token or invalid token)
 */
router.get('/students', [protect, authorize(['ADMIN'])], studentController.getAll);

export default router;