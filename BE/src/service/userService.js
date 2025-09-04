import User from '../models/User.js';

export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find().select('-password'); 
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
