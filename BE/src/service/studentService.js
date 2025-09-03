
import Student from '../models/Student.js';
import Room from '../models/Room.js'

export const createStudent = async (
    userId,
    studentId,
    fullName,
    dateOfBirth,
    gender,
    roomId) => {
    const student = new Student({
        userId,
        studentId,
        fullName,
        dateOfBirth,
        gender,
        roomId
    });
    return await student.save();
};

export const getStudentById = async (id) => {
    return await Student
        .findById(id)
        .populate('userId roomId');
};

export const getAllStudents = async () => {
    return await Student
        .find()
        .populate('userId roomId');
};