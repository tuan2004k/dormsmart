import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  paymentType: { type: String, enum: ['rent', 'deposit', 'electricity', 'water'], required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true, index: true },
  paidDate: { type: Date },
  paymentMethod: { type: String, enum: ['cash', 'transfer', 'online'] },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'cancelled'],
    default: 'pending',
    index: true,
  },
  invoiceNumber: { type: String, unique: true, sparse: true }, 
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

paymentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Payment', paymentSchema);
