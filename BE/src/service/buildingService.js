import Building from '../models/Building.js';

export const createBuilding = async (name, address) => {
  const building = new Building({ name, address });
  return await building.save();
};

export const getBuildingById = async (id) => {
  return await Building.findById(id);
};

export const getAllBuildings = async () => {
  return await Building.find();
};

export const updateBuilding = async (id, name, address) => {
  const building = await Building.findById(id);
  if (!building) {
    throw new Error('Building not found');
  }
  building.name = name || building.name;
  building.address = address || building.address;
  return await building.save();
};

export const deleteBuilding = async (id) => {
  return await Building.findByIdAndDelete(id);
};
