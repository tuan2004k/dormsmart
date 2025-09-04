import express from 'express';
import roomController from '../controllers/room.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import upload from '../config/multerConfig.js'; // Import multer upload middleware

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API for managing rooms
 */

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - roomNumber
 *               - buildingId
 *               - capacity
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: "A101"
 *               buildingId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3e"
 *               floor:
 *                 type: number
 *                 example: 1
 *               roomType:
 *                 type: string
 *                 enum: ['2-bed', '4-bed', '6-bed']
 *                 example: "2-bed"
 *               capacity:
 *                 type: number
 *                 example: 4
 *               currentOccupancy:
 *                 type: number
 *                 example: 2
 *               monthlyRent:
 *                 type: number
 *                 example: 3000000
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["AC", "Desk"]
 *               status:
 *                 type: string
 *                 enum: ['available', 'occupied', 'maintenance']
 *                 example: "available"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files for the room
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/rooms', [protect, authorize(['ADMIN']), upload.array('images', 10)], roomController.create); // Add upload.array middleware

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rooms
 *       401:
 *         description: Unauthorized
 */
router.get('/rooms', protect, roomController.getAll);

/**
 * @swagger
 * /api/rooms/available:
 *   get:
 *     summary: Get all available rooms
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of available rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       401:
 *         description: Unauthorized
 */
router.get('/rooms/available', [protect, authorize(['ADMIN', 'STAFF', 'STUDENT'])], roomController.getAvailable);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room data
 *       404:
 *         description: Room not found
 *       401:
 *         description: Unauthorized
 */
router.get('/rooms/:id', protect, roomController.getById);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room by ID (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: "A101"
 *               buildingId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3e"
 *               floor:
 *                 type: number
 *                 example: 1
 *               roomType:
 *                 type: string
 *                 enum: ['2-bed', '4-bed', '6-bed']
 *                 example: "2-bed"
 *               capacity:
 *                 type: number
 *                 example: 4
 *               currentOccupancy:
 *                 type: number
 *                 example: 2
 *               monthlyRent:
 *                 type: number
 *                 example: 3000000
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["AC", "Desk"]
 *               status:
 *                 type: string
 *                 enum: ['available', 'occupied', 'maintenance']
 *                 example: "available"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files for the room
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Room not found
 */
router.put('/rooms/:id', [protect, authorize(['ADMIN']), upload.array('images', 10)], roomController.update); // Add upload.array middleware

/**
 * @swagger
 * /api/rooms/{id}/status:
 *   put:
 *     summary: Update room status by ID (Admin and Staff only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['available', 'occupied', 'maintenance']
 *                 example: "occupied"
 *     responses:
 *       200:
 *         description: Room status updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Room not found
 */
router.put('/rooms/:id/status', [protect, authorize(['ADMIN', 'STAFF'])], roomController.updateStatus);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Room not found
 */
router.delete('/rooms/:id', [protect, authorize(['ADMIN'])], roomController.delete);

export default router;
