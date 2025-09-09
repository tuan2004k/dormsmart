import { createStudent, getStudentById, getAllStudents, updateStudent, deleteStudent } from '../service/studentService.js';
import * as contractService from '../service/contractService.js'; // Import contractService
import upload from '../config/multerConfig.js'; // Import multer upload middleware
import { info } from '../utils/logger.js'; // Import logger utility

const studentController = {
  async create(req, res) {
    info('StudentController: create method called');
    try {
      const {
        studentId,
        personalInfo: rawPersonalInfo = {},
        academicInfo: rawAcademicInfo = {},
        emergencyContact: rawEmergencyContact = {},
        status = 'active',
      } = req.body;

      const userId = req.user.id; // Get userId from authenticated user

      // Parse nested JSON strings if they are sent as strings (e.g., from multipart/form-data)
      const personalInfo = typeof rawPersonalInfo === 'string' ? JSON.parse(rawPersonalInfo) : rawPersonalInfo;
      const academicInfo = typeof rawAcademicInfo === 'string' ? JSON.parse(rawAcademicInfo) : rawAcademicInfo;
      const emergencyContact = typeof rawEmergencyContact === 'string' ? JSON.parse(rawEmergencyContact) : rawEmergencyContact;

      const documents = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

      const student = await createStudent(
        userId,
        studentId,
        personalInfo,
        academicInfo,
        emergencyContact,
        documents,
        status
      );

      res.status(201).json({ message: 'Sinh viên được tạo', student });
    } catch (error) {
      console.error('Error creating student:', error); // Log the actual error
      res.status(400).json({ message: error.message || 'Yêu cầu không hợp lệ' });
    }
  },

  async getById(req, res) {
    info(`StudentController: getById method called for ID: ${req.params.id}`);
    try {
      const student = await getStudentById(req.params.id);
      if (!student) return res.status(404).json({ message: 'Sinh viên không tồn tại' });
      res.json({ message: 'Thành công', student });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    info('StudentController: getAll method called');
    try {
      const students = await getAllStudents();
      res.json({ message: 'Thành công', students });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getContracts(req, res) {
    info(`StudentController: getContracts method called for student ID: ${req.params.id}`);
    try {
      const contracts = await contractService.getContractsByStudentId(req.params.id);
      res.json({ message: 'Contracts retrieved successfully', contracts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    info(`StudentController: update method called for ID: ${req.params.id}`);
    try {
      let updateData = { ...req.body };

      if (req.files && req.files.length > 0) {
        const newDocuments = req.files.map(file => `/uploads/${file.filename}`);
        updateData.documents = updateData.documents ? [...updateData.documents, ...newDocuments] : newDocuments;
      }

      const student = await updateStudent(req.params.id, updateData);
      if (!student) return res.status(404).json({ message: 'Sinh viên không tồn tại' });
      res.json({ message: 'Sinh viên đã được cập nhật', student });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async remove(req, res) {
    info(`StudentController: remove method called for ID: ${req.params.id}`);
    try {
      const result = await deleteStudent(req.params.id);
      res.json({ message: 'Sinh viên đã được xóa', result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default studentController;