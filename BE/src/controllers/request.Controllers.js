import * as requestService from '../service/requestService.js';
import upload from '../config/multerConfig.js'; 
import { info } from '../utils/logger.js';

export const create = async (req, res, next) => {
  info('RequestController: create method called');
  try {
    const attachments = req.files ? req.files.map(file => `/uploads/${file.filename}`) : []; 
    const requestData = { ...req.body, attachments };
    const request = await requestService.createRequest(requestData);
    res.status(201).json({ message: 'Request created successfully', request });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  info('RequestController: getAll method called');
  try {
    const requests = await requestService.getAllRequests();
    res.status(200).json({ message: 'Requests retrieved successfully', requests });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  info(`RequestController: getById method called for ID: ${req.params.id}`);
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request retrieved successfully', request });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  info(`RequestController: update method called for ID: ${req.params.id}`);
  try {
    let updateData = { ...req.body };
    if (req.files && req.files.length > 0) {
      const newAttachments = req.files.map(file => `/uploads/${file.filename}`);
      updateData.attachments = updateData.attachments ? [...updateData.attachments, ...newAttachments] : newAttachments;
    }

    const request = await requestService.updateRequest(req.params.id, updateData);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request updated successfully', request });
  } catch (error) {
    next(error);
  }
};

export const assign = async (req, res, next) => {
  info(`RequestController: assign method called for ID: ${req.params.id}`);
  try {
    const { id } = req.params;
    const { staffId } = req.body;
    const request = await requestService.assignRequest(id, staffId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request assigned successfully', request });
  } catch (error) {
    next(error);
  }
};

export const resolve = async (req, res, next) => {
  info(`RequestController: resolve method called for ID: ${req.params.id}`);
  try {
    const { id } = req.params;
    const { feedback } = req.body;
    const request = await requestService.resolveRequest(id, feedback);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request resolved successfully', request });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  info(`RequestController: remove method called for ID: ${req.params.id}`);
  try {
    const result = await requestService.deleteRequest(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
