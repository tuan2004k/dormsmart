// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    name:
    {
        type: String,
        required: true
    },
    role:
    {
        type: String,
        enum: ['STUDENT', 'ADMIN'],
        default: 'STUDENT'
    },
    phone:
    {
        type: String
    },
    password:
    {
        type: String,
        required: true
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