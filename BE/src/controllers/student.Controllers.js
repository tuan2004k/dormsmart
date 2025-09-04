import { createStudent, getStudentById, getAllStudents, updateStudent, deleteStudent } from '../service/studentService.js';
import * as contractService from '../service/contractService.js'; // Import contractService
import upload from '../config/multerConfig.js'; // Import multer upload middleware

const studentController = {
  async create(req, res) {
    try {
      const { 
        userId, 
        studentId, 
        personalInfo, 
        academicInfo, 
        emergencyContact, 
        status 
      } = req.body; 

      const documents = req.files ? req.files.map(file => `/uploads/${file.filename}`) : []; // Handle multiple document uploads

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
      res.status(400).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const student = await getStudentById(req.params.id);
      if (!student) return res.status(404).json({ message: 'Sinh viên không tồn tại' });
      res.json({ message: 'Thành công', student });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const students = await getAllStudents();
      res.json({ message: 'Thành công', students });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getContracts(req, res) {
    try {
      const contracts = await contractService.getContractsByStudentId(req.params.id);
      res.json({ message: 'Contracts retrieved successfully', contracts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
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
    try {
      const result = await deleteStudent(req.params.id);
      res.json({ message: 'Sinh viên đã được xóa', result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default studentController;