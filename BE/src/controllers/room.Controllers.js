import { createRoom, getRoomById, getAllRooms, getAvailableRooms, updateRoomStatus, updateRoom, deleteRoom } from '../service/roomService.js'; // Import updateRoomStatus
import upload from '../config/multerConfig.js'; // Import multer upload middleware

const roomController = {
  async create(req, res) {
    try {
      const { 
        roomNumber, 
        buildingId, 
        floor, 
        roomType, 
        capacity, 
        currentOccupancy, 
        monthlyRent, 
        facilities, 
        status 
      } = req.body;

      const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : []; // Handle multiple image uploads

      const room = await createRoom(
        roomNumber, 
        buildingId, 
        floor, 
        roomType, 
        capacity, 
        currentOccupancy, 
        monthlyRent, 
        facilities, 
        status, 
        images
      );
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

  async getAvailable(req, res) {
    try {
      const rooms = await getAvailableRooms();
      res.json({ message: 'Success', rooms });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      let updateData = { ...req.body };
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => `/uploads/${file.filename}`);
        updateData.images = updateData.images ? [...updateData.images, ...newImages] : newImages;
      }

      const room = await updateRoom(req.params.id, updateData); // Pass updatedata
      if (!room) return res.status(404).json({ message: 'Room not found' });
      res.json({ message: 'Room updated', room });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const room = await updateRoomStatus(id, status);
      if (!room) return res.status(404).json({ message: 'Room not found' });
      res.json({ message: 'Room status updated', room });
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
