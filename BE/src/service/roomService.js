import Room from '../models/Room.js';

export const createRoom = async (roomNumber, buildingId, capacity, status) => {
  const room = new Room({ roomNumber, buildingId, capacity, status });
  return await room.save();
};

export const getRoomById = async (id) => {
  return await Room.findById(id).populate('buildingId');
};

export const getAllRooms = async () => {
  return await Room.find().populate('buildingId');
};

export const updateRoom = async (id, roomNumber, buildingId, capacity, occupied, status) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new Error('Room not found');
  }
  room.roomNumber = roomNumber || room.roomNumber;
  room.buildingId = buildingId || room.buildingId;
  room.capacity = capacity || room.capacity;
  room.occupied = occupied || room.occupied;
  room.status = status || room.status;
  return await room.save();
};

export const deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};
