import * as contractService from '../service/contractService.js';

export const create = async (req, res, next) => {
    try {
        const contract = await contractService.createContract(req.body);
        res
        .status(201)
        .json({ message: 'Contract created successfully',
             contract });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const contracts = await contractService.getAllContracts();
        res
            .status(200)
            .json({
                message: 'Contracts retrieved successfully',
                contracts
            });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const contract = await contractService.getContractById(req.params.id);
        if (!contract) {
            return res
            .status(404)
            .json({ message: 'Contract not found' });
        }
        res.status(200)
        .json({ message: 'Contract retrieved successfully',
             contract });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const contract = await contractService.updateContract(req.params.id, req.body);
        if (!contract) {
            return res
            .status(404)
            .json({ message: 'Contract not found' });
        }
        res
        .status(200)
        .json({ message: 'Contract updated successfully',
             contract });
    } catch (error) {
        next(error);
    }
};

export const sign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming `protect` middleware populates `req.user`
    const contract = await contractService.signContract(id, userId);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json({ message: 'Contract signed successfully', contract });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
    try {
        const result = await contractService.deleteContract(req.params.id);
        res
        .status(200)
        .json(result);
    } catch (error) {
        next(error);
    }
};
