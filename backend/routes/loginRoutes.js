// backend/routes/loginRoutes.js

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// User Login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', userType: user.userType });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
