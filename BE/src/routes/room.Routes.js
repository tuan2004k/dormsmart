import express from 'express';
import roomController from '../controllers/room.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';

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
 *         application/json:
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
 *               capacity:
 *                 type: number
 *                 example: 4
 *               status:
 *                 type: string
 *                 enum: [Available, Occupied, Maintenance]
 *                 example: "Available"
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
router.post('/rooms', [protect, authorize(['ADMIN'])], roomController.create);

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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *               occupied:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Available, Occupied, Maintenance]
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
router.put('/rooms/:id', [protect, authorize(['ADMIN'])], roomController.update);

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
