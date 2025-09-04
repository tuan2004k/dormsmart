import Contract from '../models/Contract.js';
import sendEmail from './emailService.js'; // Import sendEmail
import Student from '../models/Student.js'; // Import Student model
import User from '../models/User.js'; // Import User model

// Create a new contract
export const createContract = async (contractData) => {
  try {
    const contract = new Contract(contractData);
    await contract.save();
    return contract;
  } catch (error) {
    throw new Error(`Error creating contract: ${error.message}`);
  }
};

// Get all contracts
export const getAllContracts = async () => {
  try {
    const contracts = await Contract.find().populate('studentId roomId createdBy');
    return contracts;
  } catch (error) {
    throw new Error(`Error fetching contracts: ${error.message}`);
  }
};

// Get contract by ID
export const getContractById = async (id) => {
  try {
    const contract = await Contract.findById(id).populate('studentId roomId createdBy');
    return contract;
  } catch (error) {
    throw new Error(`Error fetching contract by ID: ${error.message}`);
  }
};

// Get contracts by student ID
export const getContractsByStudentId = async (studentId) => {
  try {
    const contracts = await Contract.find({ studentId }).populate('studentId roomId createdBy');
    return contracts;
  } catch (error) {
    throw new Error(`Error fetching contracts for student: ${error.message}`);
  }
};

// Update contract by ID
export const updateContract = async (id, updateData) => {
  try {
    const contract = await Contract.findByIdAndUpdate(id, updateData, { new: true });
    return contract;
  } catch (error) {
    throw new Error(`Error updating contract: ${error.message}`);
  }
};

// Sign a contract
export const signContract = async (id, userId) => {
  try {
    const contract = await Contract.findByIdAndUpdate(
      id,
      { status: 'active', signedAt: new Date(), createdBy: userId },
      { new: true }
    ).populate('studentId'); // Populate studentId to get student details

    if (contract) {
      const student = await Student.findById(contract.studentId); // Get student details
      if (student) {
        const user = await User.findById(student.userId); // Get user (email) details
        if (user && user.email) {
          const subject = 'Hợp đồng của bạn đã được ký kết!';
          const htmlContent = `
            <h1>Xin chúc mừng, ${user.profile.fullName}!</h1>
            <p>Hợp đồng thuê phòng của bạn (Mã hợp đồng: ${contract.contractNumber}) đã được ký kết thành công.</p>
            <p>Bạn có thể xem chi tiết hợp đồng tại đây: <a href="http://yourfrontend.com/contracts/${contract._id}">Xem hợp đồng</a></p>
            <p>Trân trọng,</p>
            <p>Đội ngũ quản lý ký túc xá</p>
          `;
          await sendEmail(user.email, subject, htmlContent);
        }
      }
    }

    return contract;
  } catch (error) {
    throw new Error(`Error signing contract: ${error.message}`);
  }
};

// Delete contract by ID
export const deleteContract = async (id) => {
  try {
    await Contract.findByIdAndDelete(id);
    return { message: 'Contract deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting contract: ${error.message}`);
  }
};
