import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true,
        index: true, // Added index to userId
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    personalInfo: {
        fullName: { type: String, required: true },
        dateOfBirth: { type: Date },
        gender: { type: String, enum: ['Male', 'Female', 'Other'] },
        phone: { type: String },
        email: { type: String },
        idCard: { type: String },
        address: { type: String },
    },
    academicInfo: {
        university: { type: String },
        faculty: { type: String },
        major: { type: String },
        year: { type: Number },
    },
    emergencyContact: {
        name: { type: String },
        relationship: { type: String },
        phone: { type: String },
    },
    documents: [String],
    status: {
        type: String,
        enum: ['active', 'graduated', 'dropped'],
        default: 'active',
        index: true, // Added index to status
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

studentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('Student', studentSchema);
