import Payment from '../models/Payment.js';

// Create a new payment
export const createPayment = async (paymentData) => {
  try {
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
  } catch (error) {
    throw new Error(`Error creating payment: ${error.message}`);
  }
};

// Get all payments
export const getAllPayments = async () => {
  try {
    const payments = await Payment.find().populate('contractId studentId');
    return payments;
  } catch (error) {
    throw new Error(`Error fetching payments: ${error.message}`);
  }
};

// Get payment by ID
export const getPaymentById = async (id) => {
  try {
    const payment = await Payment.findById(id).populate('contractId studentId');
    return payment;
  } catch (error) {
    throw new Error(`Error fetching payment by ID: ${error.message}`);
  }
};

// Get payments by contract ID
export const getPaymentsByContractId = async (contractId) => {
  try {
    const payments = await Payment.find({ contractId }).populate('contractId studentId');
    return payments;
  } catch (error) {
    throw new Error(`Error fetching payments for contract: ${error.message}`);
  }
};

// Update payment by ID
export const updatePayment = async (id, updateData) => {
  try {
    const payment = await Payment.findByIdAndUpdate(id, updateData, { new: true });
    return payment;
  } catch (error) {
    throw new Error(`Error updating payment: ${error.message}`);
  }
};

// Confirm a payment
export const confirmPayment = async (id) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      id,
      { status: 'paid', paidDate: new Date() },
      { new: true }
    );
    return payment;
  } catch (error) {
    throw new Error(`Error confirming payment: ${error.message}`);
  }
};

// Get overdue payments
export const getOverduePayments = async () => {
  try {
    const payments = await Payment.find({
      status: 'pending',
      dueDate: { $lt: new Date() }
    }).populate('contractId studentId');
    return payments;
  } catch (error) {
    throw new Error(`Error fetching overdue payments: ${error.message}`);
  }
};

// Delete payment by ID
export const deletePayment = async (id) => {
  try {
    await Payment.findByIdAndDelete(id);
    return { message: 'Payment deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting payment: ${error.message}`);
  }
};
