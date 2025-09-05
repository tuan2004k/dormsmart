import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { error, info } from '../utils/logger.js';

// Ensure the uploads directory exists
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  info(`Created uploads directory at ${uploadsDir}`);
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Multer: Setting destination...');
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    console.log('Multer: Setting filename...');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Check file type
const checkFileType = (file, cb) => {
  console.log('Multer: Checking file type...');
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    console.log('Multer: File type accepted.');
    return cb(null, true);
  } else {
    console.log('Multer: File type rejected.');
    cb(new Error('Error: Images/Documents Only! (jpeg, jpg, png, gif, pdf, doc, docx)'));
  }
};

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    console.log('Multer: Applying file filter...');
    checkFileType(file, cb);
  },
});

export default upload;
