import Room from '../models/Room.js';

export const createRoom = async (
  roomNumber,
  buildingId,
  floor,
  roomType,
  capacity,
  currentOccupancy,
  monthlyRent,
  facilities,
  status,
  images) => {
  const room = new Room({
    roomNumber,
    buildingId,
    floor,
    roomType,
    capacity,
    currentOccupancy,
    monthlyRent,
    facilities,
    status,
    images,
  });
  return await room.save();
};

export const getRoomById = async (id) => {
  return await Room.findById(id).populate('buildingId');
};

export const getAllRooms = async () => {
  return await Room.find();
};

export const getAvailableRooms = async () => {
  try {
    const rooms = await Room.find({ status: 'available' }).populate('buildingId');
    return rooms;
  } catch (error) {
    throw new Error(`Error fetching available rooms: ${error.message}`);
  }
};

export const updateRoomStatus = async (id, newStatus) => {
  try {
    const room = await Room.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    return room;
  } catch (error) {
    throw new Error(`Error updating room status: ${error.message}`);
  }
};

export const updateRoom = async (id, updateData) => {
  try {
    const room = await Room.findByIdAndUpdate(id, updateData, { new: true });
    return room;
  } catch (error) {
    throw new Error(`Error updating room: ${error.message}`);
  }
};

export const deleteRoom = async (id) => {
  try {
    await Room.findByIdAndDelete(id);
    return { message: 'Room deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting room: ${error.message}`);
  }
};
