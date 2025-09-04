import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type:
            String,
        required: true,
        trim: true,
    },
    buildingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building', required: true,
        index: true, // Added index to buildingId
    },
    floor: { type: Number },
    roomType: { type: String, enum: ['2-bed', '4-bed', '6-bed'], index: true }, // Added index to roomType
    capacity: {
        type: Number,
        required: true
    },
    currentOccupancy: { // Renamed from 'occupied'
        type: Number,
        default: 0
    },
    monthlyRent: { type: Number },
    facilities: [String],
    status: {
        type: String,
        enum: ['available', 'occupied', 'maintenance'], // Lowercase enum values
        default: 'available', // Changed default to lowercase
        index: true, // Added index to status
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

roomSchema.index({ roomNumber: 1, buildingId: 1 }, { unique: true }); // Compound index for roomNumber and buildingId

roomSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Room', roomSchema); 
