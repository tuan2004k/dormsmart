import {
    createBuilding,
    getBuildingById,
    getAllBuildings,
    updateBuilding,
    deleteBuilding
} from '../service/buildingService.js';
import { info } from '../utils/logger.js'; // Import info logger

const buildingController = {
    async create(req, res) {
        info('BuildingController: create method called');
        try {
            const { 
                name, 
                code, 
                address, 
                description, 
                facilities, 
                totalFloors, 
                totalRooms, 
                managerId, 
                status 
            } = req.body;

            const building = await createBuilding(
                name, 
                code, 
                address, 
                description, 
                facilities, 
                totalFloors, 
                totalRooms, 
                managerId, 
                status
            );
            res.status(201)
                .json({ message: 'Building created', building });
        } catch (error) {
            res.status(400)
                .json({ message: error.message });
        }
    },

    async getById(req, res) {
        info(`BuildingController: getById method called for ID: ${req.params.id}`);
        try {
            const building = await getBuildingById(req.params.id);
            if (!building) return res
                .status(404)
                .json({ message: 'Building not found' });
            res.json({
                message: 'Success',
                building
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAll(req, res) {
        info('BuildingController: getAll method called');
        try {
            const buildings = await getAllBuildings();
            res.json({
                message: 'Success',
                buildings
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    async update(req, res) {
        info(`BuildingController: update method called for ID: ${req.params.id}`);
        try {
            const building = await updateBuilding(req.params.id, req.body); // Pass req.body directly
            if (!building) return res.status(404).json({ message: 'Building not found' });
            res.json({ message: 'Building updated', building });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async delete(req, res) {
        info(`BuildingController: delete method called for ID: ${req.params.id}`);
        try {
            const building = await deleteBuilding(req.params.id);
            if (!building) return res.status(404).json({ message: 'Building not found' });
            res.json({ message: 'Building deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default buildingController;
