import express from 'express';
import * as paymentController from '../controllers/payment.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API for managing payments
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment (Admin/Staff only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contractId
 *               - studentId
 *               - paymentType
 *               - amount
 *               - dueDate
 *             properties:
 *               contractId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3e"
 *               studentId:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5ec49f132e35a1c9d2a3f"
 *               paymentType:
 *                 type: string
 *                 enum: [rent, deposit, electricity, water]
 *                 example: "rent"
 *               amount:
 *                 type: number
 *                 example: 3000000
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-01"
 *               paidDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-09-28"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, transfer, online]
 *                 example: "online"
 *               status:
 *                 type: string
 *                 enum: [pending, paid, overdue, cancelled]
 *                 example: "paid"
 *               invoiceNumber:
 *                 type: string
 *                 example: "INV-2023-001"
 *               note:
 *                 type: string
 *                 example: "Monthly rent for September"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.post('/payments', [protect, authorize(['ADMIN', 'STAFF'])], paymentController.create);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments (Admin/Staff only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of payments
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/payments', [protect, authorize(['ADMIN', 'STAFF'])], paymentController.getAll);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get a payment by ID (Admin/Staff/Student)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment data
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff or the owning Student)
 */
router.get('/payments/:id', protect, paymentController.getById);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update a payment by ID (Admin/Staff only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentType:
 *                 type: string
 *                 enum: [rent, deposit, electricity, water]
 *               amount:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date
 *               paidDate:
 *                 type: string
 *                 format: date
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, transfer, online]
 *               status:
 *                 type: string
 *                 enum: [pending, paid, overdue, cancelled]
 *               invoiceNumber:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 *       404:
 *         description: Payment not found
 */
router.put('/payments/:id', [protect, authorize(['ADMIN', 'STAFF'])], paymentController.update);

/**
 * @swagger
 * /api/payments/{id}/confirm:
 *   put:
 *     summary: Confirm a payment by ID (Admin/Staff only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.put('/payments/:id/confirm', [protect, authorize(['ADMIN', 'STAFF'])], paymentController.confirm);

/**
 * @swagger
 * /api/payments/overdue:
 *   get:
 *     summary: Get all overdue payments (Admin/Staff only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of overdue payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/payments/overdue', [protect, authorize(['ADMIN', 'STAFF'])], paymentController.getOverdue);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID (Admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin)
 *       404:
 *         description: Payment not found
 */
router.delete('/payments/:id', [protect, authorize(['ADMIN'])], paymentController.remove);

export default router;
