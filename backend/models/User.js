// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['elderly', 'volunteer'],
        required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Common fields for both user types
    age: { type: Number },
    location: { type: String },
    contact: { type: String },

    // Elderly-specific fields
    needs: { type: String },
    healthConditions: { type: String },

    // Volunteer-specific fields
    skills: { type: String },
    availability: { type: String },
    paymentRate: { type: Number },
    servicesOffered: { type: String },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
