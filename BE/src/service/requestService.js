import Request from '../models/Request.js';
import { emitNotification } from '../utils/socket.js'; // Import emitNotification


export const createRequest = async (requestData) => {
  try {
    const request = new Request(requestData);
    await request.save();
    
    // Populate studentId to get user details for notification
    await request.populate('studentId');

    // Notify the student who created the request
    emitNotification(request.studentId.userId.toString(), 'newRequest', {
      message: `Yêu cầu mới của bạn (${request.title}) đã được tạo.`, 
      requestId: request._id, 
      status: request.status
    });
    
    // Notify all Admins and Staff about the new request (assuming a 'staff' room or iterating through staff users)
    // For simplicity, let's assume we have a way to get all Admin/Staff user IDs.
    // In a real application, you might have a dedicated 'staff' or 'admin' room.
    // For now, let's just log a message for staff notification.
    console.log('Notifying Admins/Staff about new request:', request._id);
    // Example: io.to('staffRoom').emit('newRequestForStaff', { requestId: request._id, title: request.title });

    return request;
  } catch (error) {
    throw new Error(`Error creating request: ${error.message}`);
  }
};

export const getAllRequests = async () => {
  try {
    const requests = await Request.find().populate('studentId roomId assignedTo');
    return requests;
  } catch (error) {
    throw new Error(`Error fetching requests: ${error.message}`);
  }
};

export const getRequestById = async (id) => {
  try {
    const request = await Request.findById(id).populate('studentId roomId assignedTo');
    return request;
  } catch (error) {
    throw new Error(`Error fetching request by ID: ${error.message}`);
  }
};

export const updateRequest = async (id, updateData) => {
  try {
    const request = await Request.findByIdAndUpdate(id, updateData, { new: true });
    return request;
  } catch (error) {
    throw new Error(`Error updating request: ${error.message}`);
  }
};

export const assignRequest = async (id, staffId) => {
  try {
    const request = await Request.findByIdAndUpdate(
      id,
      { assignedTo: staffId, status: 'in_progress' },
      { new: true }
    ).populate('studentId assignedTo'); // Populate to get user details

    if (request) {
      // Notify the student that their request has been assigned
      emitNotification(request.studentId.userId.toString(), 'requestAssigned', {
        message: `Yêu cầu của bạn (${request.title}) đã được gán cho nhân viên ${request.assignedTo.profile.fullName}.`, 
        requestId: request._id,
        assignedTo: request.assignedTo._id,
        status: request.status
      });

      // Notify the assigned staff member
      emitNotification(request.assignedTo.toString(), 'requestAssignedToYou', {
        message: `Bạn đã được gán yêu cầu mới (${request.title}).`, 
        requestId: request._id,
        studentId: request.studentId.userId,
        status: request.status
      });
    }
    return request;
  } catch (error) {
    throw new Error(`Error assigning request: ${error.message}`);
  }
};

export const resolveRequest = async (id, feedback) => {
  try {
    const request = await Request.findByIdAndUpdate(
      id,
      { status: 'resolved', resolvedAt: new Date(), feedback },
      { new: true }
    ).populate('studentId'); // Populate to get user details

    if (request) {
      // Notify the student that their request has been resolved
      emitNotification(request.studentId.userId.toString(), 'requestResolved', {
        message: `Yêu cầu của bạn (${request.title}) đã được giải quyết.`, 
        requestId: request._id, 
        status: request.status
      });
    }

    return request;
  } catch (error) {
    throw new Error(`Error resolving request: ${error.message}`);
  }
};

export const deleteRequest = async (id) => {
  try {
    await Request.findByIdAndDelete(id);
    return { message: 'Request deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting request: ${error.message}`);
  }
};
