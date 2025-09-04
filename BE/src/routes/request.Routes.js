import express from 'express';
import * as requestController from '../controllers/request.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import upload from '../config/multerConfig.js'; // Import multer upload middleware

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: API for managing student requests (e.g., maintenance, room change)
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new request (Student/Admin/Staff)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - type
 *               - title
 *               - description
 *             properties:
 *               studentId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3e"
 *               roomId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3f"
 *               type:
 *                 type: string
 *                 enum: ['maintenance', 'room_change', 'complaint', 'other']
 *                 example: "maintenance"
 *               title:
 *                 type: string
 *                 example: "Fixing AC in Room B203"
 *               description:
 *                 type: string
 *                 example: "The air conditioner in room B203 is not working properly."
 *               priority:
 *                 type: string
 *                 enum: ['low', 'medium', 'high', 'urgent']
 *                 example: "medium"
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of attachment files for the request
 *               assignedTo:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3c"
 *               feedback:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 5
 *                   comment:
 *                     type: string
 *     responses:
 *       201:
 *         description: Request created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/requests', [protect, authorize(['STUDENT', 'ADMIN', 'STAFF']), upload.array('attachments', 10)], requestController.create); // Add upload.array middleware

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests (Admin/Staff only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of requests
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/requests', [protect, authorize(['ADMIN', 'STAFF'])], requestController.getAll);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get a request by ID (Admin/Staff/Owning Student)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request ID
 *     responses:
 *       200:
 *         description: Request data
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff or the owning Student)
 */
router.get('/requests/:id', protect, requestController.getById);

/**
 * @swagger
 * /api/requests/{id}:
 *   put:
 *     summary: Update a request by ID (Admin/Staff/Owning Student for some fields)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ['maintenance', 'room_change', 'complaint', 'other']
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: ['low', 'medium', 'high', 'urgent']
 *               status:
 *                 type: string
 *                 enum: ['pending', 'in_progress', 'resolved', 'rejected']
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of attachment files for the request
 *               assignedTo:
 *                 type: string
 *                 format: ObjectId
 *               resolvedAt:
 *                 type: string
 *                 format: date
 *               feedback:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 5
 *                   comment:
 *                     type: string
 *     responses:
 *       200:
 *         description: Request updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff or allowed for Student)
 *       404:
 *         description: Request not found
 */
router.put('/requests/:id', [protect, authorize(['ADMIN', 'STAFF', 'STUDENT']), upload.array('attachments', 10)], requestController.update); // Add upload.array middleware

/**
 * @swagger
 * /api/requests/{id}/assign:
 *   put:
 *     summary: Assign a request to a staff member (Admin/Staff only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staffId
 *             properties:
 *               staffId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3c"
 *                 description: ID of the staff member to assign the request to
 *     responses:
 *       200:
 *         description: Request assigned successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 *       404:
 *         description: Request not found
 */
router.put('/requests/:id/assign', [protect, authorize(['ADMIN', 'STAFF'])], requestController.assign);

/**
 * @swagger
 * /api/requests/{id}/resolve:
 *   put:
 *     summary: Resolve a request (Admin/Staff only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 5
 *                   comment:
 *                     type: string
 *                 description: Feedback provided when resolving the request
 *     responses:
 *       200:
 *         description: Request resolved successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 *       404:
 *         description: Request not found
 */
router.put('/requests/:id/resolve', [protect, authorize(['ADMIN', 'STAFF'])], requestController.resolve);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete a request by ID (Admin/Staff only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request ID
 *     responses:
 *       200:
 *         description: Request deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 *       404:
 *         description: Request not found
 */
router.delete('/requests/:id', [protect, authorize(['ADMIN', 'STAFF'])], requestController.remove);

export default router;
