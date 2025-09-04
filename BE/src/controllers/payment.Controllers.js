import * as paymentService from '../service/paymentService.js';

export const create = async (req, res, next) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json({ message: 'Payments retrieved successfully', payments });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment retrieved successfully', payment });
  } catch (error) {
    next(error);
  }
};

export const getPaymentsByContract = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payments = await paymentService.getPaymentsByContractId(id);
    res.status(200).json({ message: 'Payments retrieved successfully for contract', payments });
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await paymentService.confirmPayment(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment confirmed successfully', payment });
  } catch (error) {
    next(error);
  }
};

export const getOverdue = async (req, res, next) => {
  try {
    const payments = await paymentService.getOverduePayments();
    res.status(200).json({ message: 'Overdue payments retrieved successfully', payments });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const payment = await paymentService.updatePayment(req.params.id, req.body);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const result = await paymentService.deletePayment(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
