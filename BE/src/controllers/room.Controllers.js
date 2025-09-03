import { createRoom, getRoomById, getAllRooms, updateRoom, deleteRoom } from '../service/roomService.js';

const roomController = {
  async create(req, res) {
    try {
      const { roomNumber, buildingId, capacity, status } = req.body;
      const room = await createRoom(roomNumber, buildingId, capacity, status);
      res.status(201).json({ message: 'Room created', room });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const room = await getRoomById(req.params.id);
      if (!room) return res.status(404).json({ message: 'Room not found' });
      res.json({ message: 'Success', room });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const rooms = await getAllRooms();
      res.json({ message: 'Success', rooms });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { roomNumber, buildingId, capacity, occupied, status } = req.body;
      const room = await updateRoom(req.params.id, roomNumber, buildingId, capacity, occupied, status);
      res.json({ message: 'Room updated', room });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const room = await deleteRoom(req.params.id);
      if (!room) return res.status(404).json({ message: 'Room not found' });
      res.json({ message: 'Room deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default roomController;
