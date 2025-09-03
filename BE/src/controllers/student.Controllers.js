import { createStudent, getStudentById, getAllStudents } from '../service/studentService.js';

const studentController = {
  async create(req, res) {
    try {
      const { userId, studentId, fullName, dateOfBirth, gender, roomId } = req.body;
      const student = await createStudent(userId, studentId, fullName, dateOfBirth, gender, roomId);
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
};

export default studentController;