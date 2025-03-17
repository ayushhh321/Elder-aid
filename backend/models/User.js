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
    age: { type: Number },
    needs: { type: String },
    skills: { type: String },
    availability: { type: String }
});

const User = mongoose.model('User', userSchema);
export default User;