
import Student from '../models/Student.js';

export const createStudent = async (
    userId,
    studentId,
    personalInfo,
    academicInfo,
    emergencyContact,
    documents,
    status) => {
    try {
        const student = new Student({
            userId,
            studentId,
            personalInfo,
            academicInfo,
            emergencyContact,
            documents,
            status,
        });
        return await student.save();
    } catch (error) {
        throw new Error(`Error creating student: ${error.message}`);
    }
};

export const getStudentById = async (id) => {
    try {
        return await Student
            .findById(id)
            .populate('userId');
    } catch (error) {
        throw new Error(`Error fetching student by ID: ${error.message}`);
    }
};

export const getAllStudents = async () => {
    try {
        return await Student
            .find()
            .populate('userId');
    } catch (error) {
        throw new Error(`Error fetching students: ${error.message}`);
    }
};

export const updateStudent = async (id, updateData) => {
    try {
        const student = await Student.findByIdAndUpdate(id, updateData, { new: true });
        return student;
    } catch (error) {
        throw new Error(`Error updating student: ${error.message}`);
    }
};

export const deleteStudent = async (id) => {
    try {
        await Student.findByIdAndDelete(id);
        return { message: 'Student deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting student: ${error.message}`);
    }
};