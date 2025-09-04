import express from 'express';
import buildingController from '../controllers/building.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Buildings
 *   description: API for managing buildings
 */

/**
 * @swagger
 * /api/buildings:
 *   post:
 *     summary: Create a new building (Admin only)
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Building A"
 *               code:
 *                 type: string
 *                 example: "BLDA"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               description:
 *                 type: string
 *                 example: "A new dormitory building"
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Wifi", "Laundry"]
 *               totalFloors:
 *                 type: number
 *                 example: 5
 *               totalRooms:
 *                 type: number
 *                 example: 100
 *               managerId:
 *                 type: string
 *                 format: objectid
 *                 example: "60d0fe4f5311236168a10996"
 *               status:
 *                 type: string
 *                 enum: ['active', 'maintenance', 'closed']
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Building created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/buildings', [protect, authorize(['ADMIN'])], buildingController.create);

/**
 * @swagger
 * /api/buildings:
 *   get:
 *     summary: Get all buildings
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of buildings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Building'
 *       401:
 *         description: Unauthorized
 */
router.get('/buildings', protect, buildingController.getAll);

/**
 * @swagger
 * /api/buildings/{id}:
 *   get:
 *     summary: Get a building by ID
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The building ID
 *     responses:
 *       200:
 *         description: Building data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Building'
 *       404:
 *         description: Building not found
 *       401:
 *         description: Unauthorized
 */
router.get('/buildings/:id', protect, buildingController.getById);

/**
 * @swagger
 * /api/buildings/{id}:
 *   put:
 *     summary: Update a building by ID (Admin only)
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The building ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *               totalFloors:
 *                 type: number
 *               totalRooms:
 *                 type: number
 *               managerId:
 *                 type: string
 *                 format: objectid
 *               status:
 *                 type: string
 *                 enum: ['active', 'maintenance', 'closed']
 *     responses:
 *       200:
 *         description: Building updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Building not found
 */
router.put('/buildings/:id', [protect, authorize(['ADMIN'])], buildingController.update);

/**
 * @swagger
 * /api/buildings/{id}:
 *   delete:
 *     summary: Delete a building by ID (Admin only)
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The building ID
 *     responses:
 *       200:
 *         description: Building deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Building not found
 */
router.delete('/buildings/:id', [protect, authorize(['ADMIN'])], buildingController.delete);

export default router;
