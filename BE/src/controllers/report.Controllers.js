import * as reportService from '../service/reportService.js';
import { generateExcelReport } from '../utils/reportGenerator.js'; // Import generateExcelReport

export const getDashboardStatistics = async (req, res, next) => {
  try {
    const studentStats = await reportService.getStudentStatistics();
    const roomStats = await reportService.getRoomStatistics();
    const contractStats = await reportService.getContractStatistics();
    const paymentStats = await reportService.getPaymentStatistics();
    const requestStats = await reportService.getRequestStatistics();

    res.status(200).json({
      message: 'Dashboard statistics retrieved successfully',
      data: {
        studentStats,
        roomStats,
        contractStats,
        paymentStats,
        requestStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentReports = async (req, res, next) => {
  try {
    const studentStats = await reportService.getStudentStatistics();
    res.status(200).json({ message: 'Student reports retrieved successfully', data: studentStats });
  } catch (error) {
    next(error);
  }
};

export const exportStudentReportsExcel = async (req, res, next) => {
  try {
    const studentStats = await reportService.getStudentStatistics();
    const headers = [
      { title: 'Total Students', key: 'totalStudents', width: 20 },
      { title: 'Status', key: 'status', width: 15 },
      { title: 'Count', key: 'count', width: 10 },
      { title: 'Gender', key: 'gender', width: 15 },
      { title: 'Gender Count', key: 'genderCount', width: 15 },
    ];

    const data = [{
      totalStudents: studentStats.totalStudents,
      status: '',
      count: '',
      gender: '',
      genderCount: '',
    }];

    studentStats.studentsByStatus.forEach(stat => {
      data.push({
        totalStudents: '',
        status: stat._id,
        count: stat.count,
        gender: '',
        genderCount: '',
      });
    });

    studentStats.studentsByGender.forEach(stat => {
      data.push({
        totalStudents: '',
        status: '',
        count: '',
        gender: stat._id,
        genderCount: stat.count,
      });
    });

    const buffer = await generateExcelReport('Student Report', headers, data, 'Students');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=student_report.xlsx');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const getRoomReports = async (req, res, next) => {
  try {
    const roomStats = await reportService.getRoomStatistics();
    res.status(200).json({ message: 'Room reports retrieved successfully', data: roomStats });
  } catch (error) {
    next(error);
  }
};

export const exportRoomReportsExcel = async (req, res, next) => {
  try {
    const roomStats = await reportService.getRoomStatistics();
    const headers = [
      { title: 'Total Rooms', key: 'totalRooms', width: 20 },
      { title: 'Status', key: 'status', width: 15 },
      { title: 'Count', key: 'count', width: 10 },
      { title: 'Type', key: 'type', width: 15 },
      { title: 'Type Count', key: 'typeCount', width: 15 },
      { title: 'Total Capacity', key: 'totalCapacity', width: 20 },
      { title: 'Current Occupancy', key: 'currentOccupancy', width: 20 },
    ];

    const data = [{
      totalRooms: roomStats.totalRooms,
      status: '',
      count: '',
      type: '',
      typeCount: '',
      totalCapacity: roomStats.totalCapacity,
      currentOccupancy: roomStats.currentOccupancy,
    }];

    roomStats.roomsByStatus.forEach(stat => {
      data.push({
        totalRooms: '',
        status: stat._id,
        count: stat.count,
        type: '',
        typeCount: '',
        totalCapacity: '',
        currentOccupancy: '',
      });
    });

    roomStats.roomsByType.forEach(stat => {
      data.push({
        totalRooms: '',
        status: '',
        count: '',
        type: stat._id,
        typeCount: stat.count,
        totalCapacity: '',
        currentOccupancy: '',
      });
    });

    const buffer = await generateExcelReport('Room Report', headers, data, 'Rooms');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=room_report.xlsx');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const getContractReports = async (req, res, next) => {
  try {
    const contractStats = await reportService.getContractStatistics();
    res.status(200).json({ message: 'Contract reports retrieved successfully', data: contractStats });
  } catch (error) {
    next(error);
  }
};

export const exportContractReportsExcel = async (req, res, next) => {
  try {
    const contractStats = await reportService.getContractStatistics();
    const headers = [
      { title: 'Total Contracts', key: 'totalContracts', width: 20 },
      { title: 'Status', key: 'status', width: 15 },
      { title: 'Count', key: 'count', width: 10 },
    ];

    const data = [{
      totalContracts: contractStats.totalContracts,
      status: '',
      count: '',
    }];

    contractStats.contractsByStatus.forEach(stat => {
      data.push({
        totalContracts: '',
        status: stat._id,
        count: stat.count,
      });
    });

    const buffer = await generateExcelReport('Contract Report', headers, data, 'Contracts');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=contract_report.xlsx');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const getPaymentReports = async (req, res, next) => {
  try {
    const paymentStats = await reportService.getPaymentStatistics();
    res.status(200).json({ message: 'Payment reports retrieved successfully', data: paymentStats });
  } catch (error) {
    next(error);
  }
};

export const exportPaymentReportsExcel = async (req, res, next) => {
  try {
    const paymentStats = await reportService.getPaymentStatistics();
    const headers = [
      { title: 'Total Payments', key: 'totalPayments', width: 20 },
      { title: 'Status', key: 'status', width: 15 },
      { title: 'Count', key: 'count', width: 10 },
      { title: 'Total Revenue', key: 'totalRevenue', width: 20 },
      { title: 'Overdue Payments', key: 'overduePayments', width: 20 },
    ];

    const data = [{
      totalPayments: paymentStats.totalPayments,
      status: '',
      count: '',
      totalRevenue: paymentStats.totalRevenue,
      overduePayments: paymentStats.overduePayments,
    }];

    paymentStats.paymentsByStatus.forEach(stat => {
      data.push({
        totalPayments: '',
        status: stat._id,
        count: stat.count,
        totalRevenue: '',
        overduePayments: '',
      });
    });

    const buffer = await generateExcelReport('Payment Report', headers, data, 'Payments');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=payment_report.xlsx');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const getRequestReports = async (req, res, next) => {
  try {
    const requestStats = await reportService.getRequestStatistics();
    res.status(200).json({ message: 'Request reports retrieved successfully', data: requestStats });
  } catch (error) {
    next(error);
  }
};

export const exportRequestReportsExcel = async (req, res, next) => {
  try {
    const requestStats = await reportService.getRequestStatistics();
    const headers = [
      { title: 'Total Requests', key: 'totalRequests', width: 20 },
      { title: 'Type', key: 'type', width: 15 },
      { title: 'Type Count', key: 'typeCount', width: 15 },
      { title: 'Priority', key: 'priority', width: 15 },
      { title: 'Priority Count', key: 'priorityCount', width: 15 },
      { title: 'Status', key: 'status', width: 15 },
      { title: 'Status Count', key: 'statusCount', width: 15 },
    ];

    const data = [{
      totalRequests: requestStats.totalRequests,
      type: '',
      typeCount: '',
      priority: '',
      priorityCount: '',
      status: '',
      statusCount: '',
    }];

    requestStats.requestsByType.forEach(stat => {
      data.push({
        totalRequests: '',
        type: stat._id,
        typeCount: stat.count,
        priority: '',
        priorityCount: '',
        status: '',
        statusCount: '',
      });
    });

    requestStats.requestsByPriority.forEach(stat => {
      data.push({
        totalRequests: '',
        type: '',
        typeCount: '',
        priority: stat._id,
        priorityCount: stat.count,
        status: '',
        statusCount: '',
      });
    });

    requestStats.requestsByStatus.forEach(stat => {
      data.push({
        totalRequests: '',
        type: '',
        typeCount: '',
        priority: '',
        priorityCount: '',
        status: stat._id,
        statusCount: stat.count,
      });
    });

    const buffer = await generateExcelReport('Request Report', headers, data, 'Requests');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=request_report.xlsx');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};
