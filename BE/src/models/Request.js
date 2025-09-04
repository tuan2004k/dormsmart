import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    requestNumber:
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
        index: true, // Added index to roomId
    },
    type:
    {
        type: String,
        enum: ['maintenance', 'room_change', 'complaint', 'other'],
        required: true,
        index: true, // Added index to type
    },
    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    priority:
    {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium',
        index: true, // Added index to priority
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'rejected'],
        default: 'pending',
        index: true, // Added index to status
    },
    attachments:
        [String],
    assignedTo:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true, // Added index to assignedTo
    },
    resolvedAt:
        { type: Date },
    feedback: {
        rating:
            { type: Number, min: 1, max: 5 },
        comment:
            { type: String },
    },
    createdAt:
        { type: Date, default: Date.now },
    updatedAt:
        { type: Date, default: Date.now },
});

requestSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Request', requestSchema);
