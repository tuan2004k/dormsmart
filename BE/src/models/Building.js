import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  facilities: [
    {
      type: String,
    },
  ],
  totalFloors: {
    type: Number,
  },
  totalRooms: {
    type: Number,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true, // Added index to managerId
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'closed'],
    default: 'active',
    index: true, // Added index to status
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

BuildingSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Building = mongoose.model('Building', BuildingSchema);

export default Building;
