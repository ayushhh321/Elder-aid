// backend/models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    helpType: { type: String, required: true },
    urgency: { type: String, required: true },
    preferredTime: { type: String },
    location: { type: String, required: true },
    budget: { type: Number, required: true }, // Added budget field
    status: { type: String, default: 'pending' }, // pending, accepted, rejected, completed
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Elderly user who created the request
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Volunteer handling the task
    rejectionMessage: { type: String, default: '' }, // Added rejection message
    medicalHistory: { type: String, default: '' } // ✅ Added medical history PDF path
});

// Add index for faster querying on status
taskSchema.index({ status: 1 });

export default mongoose.model('Task', taskSchema);
