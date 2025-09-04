import express from 'express';
import upload from '../config/multerConfig.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: API for file uploads
 */

/**
 * @swagger
 * /api/uploads/single:
 *   post:
 *     summary: Upload a single file (Admin/Staff only)
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 *       400:
 *         description: No file uploaded or invalid file type
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.post('/uploads/single', [protect, authorize(['ADMIN', 'STAFF'])], upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}` });
});

/**
 * @swagger
 * /api/uploads/multiple:
 *   post:
 *     summary: Upload multiple files (Admin/Staff only)
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePaths:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: No files uploaded or invalid file types
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Admin/Staff)
 */
router.post('/uploads/multiple', [protect, authorize(['ADMIN', 'STAFF'])], upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  const filePaths = req.files.map(file => `/uploads/${file.filename}`);
  res.status(200).json({ message: 'Files uploaded successfully', filePaths });
});

export default router;
