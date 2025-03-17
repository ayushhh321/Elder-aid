// Routes
// backend/routes/registerRoutes.js

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register User
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
