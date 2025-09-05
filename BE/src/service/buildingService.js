import Building from '../models/Building.js';

export const createBuilding = async (
  name,
  code,
  address,
  description,
  facilities,
  totalFloors,
  totalRooms,
  managerId,
  status) => {
  try {
    const building = new Building({
      name,
      code,
      address,
      description,
      facilities,
      totalFloors,
      totalRooms,
      managerId,
      status,
    });
    return await building.save();
  } catch (error) {
    throw new Error(`Error creating building: ${error.message}`);
  }
};

export const getBuildingById = async (id) => {
  try {
    return await Building.findById(id).populate('managerId');
  } catch (error) {
    throw new Error(`Error fetching building by ID: ${error.message}`);
  }
};

export const getAllBuildings = async () => {
  try {
    return await Building.find();
  } catch (error) {
    throw new Error(`Error fetching buildings: ${error.message}`);
  }
};

export const updateBuilding = async (id, updateData) => {
  try {
    const building = await Building.findByIdAndUpdate(id, updateData, { new: true });
    return building;
  } catch (error) {
    throw new Error(`Error updating building: ${error.message}`);
  }
};

export const deleteBuilding = async (id) => {
  try {
    await Building.findByIdAndDelete(id);
    return { message: 'Building deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting building: ${error.message}`);
  }
};
