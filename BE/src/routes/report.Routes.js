import express from 'express';
import * as reportController from '../controllers/report.Controllers.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API for retrieving various statistics and reports
 */

/**
 * @swagger
 * /api/reports/dashboard:
 *   get:
 *     summary: Get all dashboard statistics (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     studentStats:
 *                       type: object
 *                       properties:
 *                         totalStudents:
 *                           type: number
 *                         studentsByStatus:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                         studentsByGender:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                     roomStats:
 *                       type: object
 *                       properties:
 *                         totalRooms:
 *                           type: number
 *                         roomsByStatus:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                         roomsByType:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                         totalCapacity:
 *                           type: number
 *                         currentOccupancy:
 *                           type: number
 *                     contractStats:
 *                       type: object
 *                       properties:
 *                         totalContracts:
 *                           type: number
 *                         contractsByStatus:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                     paymentStats:
 *                       type: object
 *                       properties:
 *                         totalPayments:
 *                           type: number
 *                         paymentsByStatus:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                         totalRevenue:
 *                           type: number
 *                         overduePayments:
 *                           type: number
 *                     requestStats:
 *                       type: object
 *                       properties:
 *                         totalRequests:
 *                           type: number
 *                         requestsByType:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                         requestsByPriority:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *                         requestsByStatus:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               count:
 *                                 type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/dashboard', [protect, authorize(['ADMIN', 'STAFF'])], reportController.getDashboardStatistics);

/**
 * @swagger
 * /api/reports/students:
 *   get:
 *     summary: Get student reports (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalStudents:
 *                       type: number
 *                     studentsByStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *                     studentsByGender:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/students', [protect, authorize(['ADMIN', 'STAFF'])], reportController.getStudentReports);

/**
 * @swagger
 * /api/reports/students/excel:
 *   get:
 *     summary: Export student reports to Excel (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/students/excel', [protect, authorize(['ADMIN', 'STAFF'])], reportController.exportStudentReportsExcel);

/**
 * @swagger
 * /api/reports/rooms:
 *   get:
 *     summary: Get room reports (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Room reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRooms:
 *                       type: number
 *                     roomsByStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *                     roomsByType:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *                     totalCapacity:
 *                       type: number
 *                     currentOccupancy:
 *                       type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/rooms', [protect, authorize(['ADMIN', 'STAFF'])], reportController.getRoomReports);

/**
 * @swagger
 * /api/reports/rooms/excel:
 *   get:
 *     summary: Export room reports to Excel (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/rooms/excel', [protect, authorize(['ADMIN', 'STAFF'])], reportController.exportRoomReportsExcel);

/**
 * @swagger
 * /api/reports/contracts:
 *   get:
 *     summary: Get contract reports (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contract reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalContracts:
 *                       type: number
 *                     contractsByStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/contracts', [protect, authorize(['ADMIN', 'STAFF'])], reportController.getContractReports);

/**
 * @swagger
 * /api/reports/contracts/excel:
 *   get:
 *     summary: Export contract reports to Excel (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/contracts/excel', [protect, authorize(['ADMIN', 'STAFF'])], reportController.exportContractReportsExcel);

/**
 * @swagger
 * /api/reports/payments:
 *   get:
 *     summary: Get payment reports (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalPayments:
 *                       type: number
 *                     paymentsByStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *                         totalRevenue:
 *                           type: number
 *                         overduePayments:
 *                           type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/payments', [protect, authorize(['ADMIN', 'STAFF'])], reportController.getPaymentReports);

/**
 * @swagger
 * /api/reports/payments/excel:
 *   get:
 *     summary: Export payment reports to Excel (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/payments/excel', [protect, authorize(['ADMIN', 'STAFF'])], reportController.exportPaymentReportsExcel);

/**
 * @swagger
 * /api/reports/requests:
 *   get:
 *     summary: Get request reports (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRequests:
 *                       type: number
 *                     requestsByType:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *                     requestsByPriority:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *                     requestsByStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           count:
 *                             type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/requests', [protect, authorize(['ADMIN', 'STAFF'])], reportController.getRequestReports);

/**
 * @swagger
 * /api/reports/requests/excel:
 *   get:
 *     summary: Export request reports to Excel (Admin/Staff only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.get('/reports/requests/excel', [protect, authorize(['ADMIN', 'STAFF'])], reportController.exportRequestReportsExcel);

export default router;
