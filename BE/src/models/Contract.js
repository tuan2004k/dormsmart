import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
    contractNumber:
    {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    studentId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true, // Added index to studentId
    },
    roomId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
        index: true, // Added index to roomId
    },
    startDate:
    {
        type: Date,
        required: true
    },
    endDate:
    {
        type: Date,
        required: true
    },
    monthlyRent:
    {
        type: Number,
        required: true
    },
    deposit:
    {
        type: Number,
        required: true
    },
    electricityRate:
    {
        type: Number,
        default: 0
    },
    waterRate:
    {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'expired', 'terminated'],
        default: 'draft',
        index: true, // Added index to status
    },
    terms:
        { type: String },
    signedAt:
        { type: Date },
    createdBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    updatedAt:
    {
        type: Date,
        default: Date.now
    },
});

contractSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Contract', contractSchema);
