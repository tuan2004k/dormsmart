import express from 'express';
import * as contractController from '../controllers/contract.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import * as paymentController from '../controllers/payment.Controllers.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: API for managing contracts
 */

/**
 * @swagger
 * /api/contracts:
 *   post:
 *     summary: Create a new contract (Admin/Staff only)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contractNumber
 *               - studentId
 *               - roomId
 *               - startDate
 *               - endDate
 *               - monthlyRent
 *               - deposit
 *             properties:
 *               contractNumber:
 *                 type: string
 *                 example: "C-2023-001"
 *               studentId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3e"
 *               roomId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3f"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-09-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-31"
 *               monthlyRent:
 *                 type: number
 *                 example: 3000000
 *               deposit:
 *                 type: number
 *                 example: 6000000
 *               electricityRate:
 *                 type: number
 *                 example: 3000
 *               waterRate:
 *                 type: number
 *                 example: 100000
 *               status:
 *                 type: string
 *                 enum: [draft, active, expired, terminated]
 *                 example: "draft"
 *               terms:
 *                 type: string
 *                 example: "Standard terms and conditions apply."
 *               signedAt:
 *                 type: string
 *                 format: date
 *                 example: "2023-09-01"
 *               createdBy:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3c"
 *     responses:
 *       201:
 *         description: Contract created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.post('/contracts', [protect, authorize(['ADMIN', 'STAFF'])], contractController.create);

/**
 * @swagger
 * /api/contracts:
 *   get:
 *     summary: Get all contracts (Admin/Staff only)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of contracts
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/contracts', [protect, authorize(['ADMIN', 'STAFF'])], contractController.getAll);

/**
 * @swagger
 * /api/contracts/{id}:
 *   get:
 *     summary: Get a contract by ID (Admin/Staff/Student)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contract ID
 *     responses:
 *       200:
 *         description: Contract data
 *       404:
 *         description: Contract not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff or the owning Student)
 */
router.get('/contracts/:id', protect, contractController.getById);

/**
 * @swagger
 * /api/contracts/{id}:
 *   put:
 *     summary: Update a contract by ID (Admin/Staff only)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contract ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contractNumber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               monthlyRent:
 *                 type: number
 *               deposit:
 *                 type: number
 *               electricityRate:
 *                 type: number
 *               waterRate:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [draft, active, expired, terminated]
 *               terms:
 *                 type: string
 *               signedAt:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contract updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 *       404:
 *         description: Contract not found
 */
router.put('/contracts/:id', [protect, authorize(['ADMIN', 'STAFF'])], contractController.update);

/**
 * @swagger
 * /api/contracts/{id}/sign:
 *   put:
 *     summary: Sign a contract (Admin/Staff/Student)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contract ID
 *     responses:
 *       200:
 *         description: Contract signed successfully
 *       404:
 *         description: Contract not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff or the owning Student)
 */
router.put('/contracts/:id/sign', [protect, authorize(['ADMIN', 'STAFF', 'STUDENT'])], contractController.sign);

/**
 * @swagger
 * /api/contracts/{id}/payments:
 *   get:
 *     summary: Get payments for a contract by ID (Admin/Staff/Student)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contract ID
 *     responses:
 *       200:
 *         description: A list of payments for the contract
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Contract not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff or the owning Student)
 */
router.get('/contracts/:id/payments', [protect, authorize(['ADMIN', 'STAFF', 'STUDENT'])], paymentController.getPaymentsByContract);

/**
 * @swagger
 * /api/contracts/{id}:
 *   delete:
 *     summary: Delete a contract by ID (Admin only)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contract ID
 *     responses:
 *       200:
 *         description: Contract deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin)
 *       404:
 *         description: Contract not found
 */
router.delete('/contracts/:id', [protect, authorize(['ADMIN'])], contractController.remove);

export default router;
