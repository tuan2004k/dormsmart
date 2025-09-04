import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    role:
    {
        type: String,
        enum: ['STUDENT', 'ADMIN', 'STAFF'],
        default: 'STUDENT',
        index: true, // Added index to role
    },
    profile: {
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        avatar: {
            type: String,
        },
    },
    password:
    {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    this.updatedAt = new Date();
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
