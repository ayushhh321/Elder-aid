// // backend/routes/loginRoutes.js

// import express from 'express';
// import User from '../models/User.js';

// const router = express.Router();

// // User Login
// router.post('/', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: 'User not found' });
//         }

//         if (user.password !== password) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         res.status(200).json({ message: 'Login successful', userType: user.userType });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// export default router;

// backend/routes/loginRoutes.js
// backend/routes/loginRoutes.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// User Login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Send user information (excluding password for security)
        res.status(200).json({
            message: 'Login successful',
            userType: user.userType,
            userId: user._id,
            name: user.name
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;