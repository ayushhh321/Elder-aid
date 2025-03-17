// backend/app.js

import express from 'express';
import loginRoutes from './routes/loginRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors;'
import registerRoutes from './routes/registerRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database Connection
// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));


// Routes
app.use('/api/register', registerRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// loginRoutes
app.use('/api/login', loginRoutes);

//cors
app.use(cors());