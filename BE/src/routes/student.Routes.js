// src/routes/students.js
import express from 'express';
import studentController from '../controllers/student.Controllers.js';
import { protect} from '../middleware/authMiddleware.js'; 
import { authorize } from '../middleware/authorize.js';
import upload from '../config/multerConfig.js'; // Import multer upload middleware

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - studentId
 *               - personalInfo
 *               - academicInfo
 *               - emergencyContact
 *               - status
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
 *               personalInfo:
 *                 type: object
 *                 required:
 *                   - fullName
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "Nguyen Van A"
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: "2000-01-01"
 *                   gender:
 *                     type: string
 *                     enum: ['Male', 'Female', 'Other']
 *                     example: "Male"
 *                   phone:
 *                     type: string
 *                     example: "0912345678"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "student@example.com"
 *                   idCard:
 *                     type: string
 *                     example: "123456789"
 *                   address:
 *                     type: string
 *                     example: "123 ABC Street, City"
 *               academicInfo:
 *                 type: object
 *                 properties:
 *                   university:
 *                     type: string
 *                     example: "Example University"
 *                   faculty:
 *                     type: string
 *                     example: "Information Technology"
 *               emergencyContact:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Tran Thi B"
 *                   relationship:
 *                     type: string
 *                     example: "Mother"
 *                   phone:
 *                     type: string
 *                     example: "0987654321"
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of document files for the student
 *               status:
 *                 type: string
 *                 enum: ['active', 'graduated', 'dropped']
 *                 example: "active"
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
 *                     personalInfo:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                         email:
 *                           type: string
 *                     status:
 *                       type: string
 *       400:
 *         description: Validation error or bad request
 *       403:
 *         description: Forbidden (not admin)
 *       401:
 *         description: Unauthorized (no token or invalid token)
 */
router.post('/students', [protect, authorize(['ADMIN']), upload.array('documents', 10)], studentController.create);

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
 *                     personalInfo:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                         email:
 *                           type: string
 *                     status:
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
 *                       personalInfo:
 *                         type: object
 *                         properties:
 *                           fullName:
 *                             type: string
 *                           email:
 *                             type: string
 *                       status:
 *                         type: string
 *       403:
 *         description: Forbidden (not admin)
 *       401:
 *         description: Unauthorized (no token or invalid token)
 */
router.get('/students', [protect, authorize(['ADMIN'])], studentController.getAll);

/**
 * @swagger
 * /api/students/{id}/contracts:
 *   get:
 *     summary: Get contracts for a student by ID (Admin/Staff/Student)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: A list of contracts for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff or the owning Student)
 */
router.get('/students/:id/contracts', [protect, authorize(['ADMIN', 'STAFF', 'STUDENT'])], studentController.getContracts);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student by ID (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               personalInfo:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                   gender:
 *                     type: string
 *                     enum: ['Male', 'Female', 'Other']
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   idCard:
 *                     type: string
 *                   address:
 *                     type: string
 *               academicInfo:
 *                 type: object
 *                 properties:
 *                   university:
 *                     type: string
 *                   faculty:
 *                     type: string
 *               emergencyContact:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   relationship:
 *                     type: string
 *                     example: "Mother"
 *                   phone:
 *                     type: string
 *                     example: "0987654321"
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of document files for the student
 *               status:
 *                 type: string
 *                 enum: ['active', 'graduated', 'dropped']
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Student not found
 */
router.put('/students/:id', [protect, authorize(['ADMIN']), upload.array('documents', 10)], studentController.update);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student by ID (Admin only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Student not found
 */
router.delete('/students/:id', [protect, authorize(['ADMIN'])], studentController.remove);

export default router;