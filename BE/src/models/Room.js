import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type:
            String,
        required: true,
        unique: true
    },
    buildingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building', required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    occupied: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

roomSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Room', roomSchema);