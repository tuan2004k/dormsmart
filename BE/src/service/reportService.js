import Student from '../models/Student.js';
import Room from '../models/Room.js';
import Contract from '../models/Contract.js';
import Payment from '../models/Payment.js';
import Request from '../models/Request.js';
import User from '../models/User.js';

export const getStudentStatistics = async () => {
  try {
    const totalStudents = await Student.countDocuments();
    const studentsByStatus = await Student.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const studentsByGender = await Student.aggregate([
      { $group: { _id: '$personalInfo.gender', count: { $sum: 1 } } },
    ]);

    return {
      totalStudents,
      studentsByStatus,
      studentsByGender,
    };
  } catch (error) {
    throw new Error(`Error fetching student statistics: ${error.message}`);
  }
};

export const getRoomStatistics = async () => {
  try {
    const totalRooms = await Room.countDocuments();
    const roomsByStatus = await Room.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const roomsByType = await Room.aggregate([
      { $group: { _id: '$roomType', count: { $sum: 1 } } },
    ]);
    const totalCapacity = await Room.aggregate([
      { $group: { _id: null, total: { $sum: '$capacity' } } },
    ]);
    const currentOccupancy = await Room.aggregate([
      { $group: { _id: null, total: { $sum: '$currentOccupancy' } } },
    ]);

    return {
      totalRooms,
      roomsByStatus,
      roomsByType,
      totalCapacity: totalCapacity[0] ? totalCapacity[0].total : 0,
      currentOccupancy: currentOccupancy[0] ? currentOccupancy[0].total : 0,
    };
  } catch (error) {
    throw new Error(`Error fetching room statistics: ${error.message}`);
  }
};

export const getContractStatistics = async () => {
  try {
    const totalContracts = await Contract.countDocuments();
    const contractsByStatus = await Contract.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return {
      totalContracts,
      contractsByStatus,
    };
  } catch (error) {
    throw new Error(`Error fetching contract statistics: ${error.message}`);
  }
};

export const getPaymentStatistics = async () => {
  try {
    const totalPayments = await Payment.countDocuments();
    const paymentsByStatus = await Payment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'paid' } }, // Only sum paid amounts
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const overduePayments = await Payment.countDocuments({ status: 'overdue' });

    return {
      totalPayments,
      paymentsByStatus,
      totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
      overduePayments,
    };
  } catch (error) {
    throw new Error(`Error fetching payment statistics: ${error.message}`);
  }
};

export const getRequestStatistics = async () => {
  try {
    const totalRequests = await Request.countDocuments();
    const requestsByType = await Request.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);
    const requestsByPriority = await Request.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);
    const requestsByStatus = await Request.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return {
      totalRequests,
      requestsByType,
      requestsByPriority,
      requestsByStatus,
    };
  } catch (error) {
    throw new Error(`Error fetching request statistics: ${error.message}`);
  }
};
