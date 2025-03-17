// // Routes
// // backend/routes/registerRoutes.js

// import express from 'express';
// import User from '../models/User.js';

// const router = express.Router();

// // Register User
// router.post('/', async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// export default router;

// backend/routes/registerRoutes.js
// import express from 'express';
// import User from '../models/User.js';

// const router = express.Router();

// // Register User
// router.post('/', async (req, res) => {
//     try {
//         const { userType, name, email, password } = req.body;

//         // Input Validation
//         if (!userType || !name || !email || !password) {
//             return res.status(400).json({ error: 'All required fields must be provided' });
//         }

//         // Check for existing user
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists with this email' });
//         }

//         // Hash the password
//         //const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = new User({
//             ...req.body,
//             password: hashedPassword
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         console.error('Registration error:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// export default router;




// backend/routes/registerRoutes.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register User
router.post('/', async (req, res) => {
    try {
        const { userType, name, email, password } = req.body;

        // Input Validation
        if (!userType || !name || !email || !password) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        // Save the user
        const savedUser = await newUser.save();
        
        // Return success with userId for the frontend
        res.status(201).json({ 
            message: 'User registered successfully',
            userId: savedUser._id
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;