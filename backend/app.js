// // backend/app.js

// import express from 'express';
// import loginRoutes from './routes/loginRoutes.js';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import registerRoutes from './routes/registerRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Database Connection
// // Database Connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.error(err));


// // Enable CORS
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));


// // Routes
// app.use('/api/register', registerRoutes);

// // Server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// // loginRoutes
// app.use('/api/login', loginRoutes);

// //task
// app.use('/api/tasks', taskRoutes);




// backend/app.js

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// // Import Routes
// import loginRoutes from './routes/loginRoutes.js';
// import registerRoutes from './routes/registerRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // 🟢 Middleware
// app.use(bodyParser.json());

// // Enable CORS for both localhost and 127.0.0.1
// app.use(cors({
//     origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
// }));

// // 🟢 Database Connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('✅ MongoDB Connected'))
//     .catch(err => {
//         console.error('❌ MongoDB connection error:', err);
//         process.exit(1); // Exit on failure
//     });

// // 🟢 Routes
// app.use('/api/register', registerRoutes);
// app.use('/api/login', loginRoutes);
// app.use('/api/tasks', taskRoutes);

// // 🟡 Catch-All for Undefined Routes
// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found' });
// });

// // 🔴 Global Error Handler
// app.use((err, req, res, next) => {
//     console.error('❗ Server Error:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
// });

// // 🟢 Start the Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });






// backend/app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import Routes
import loginRoutes from './routes/loginRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 🟢 Middleware
app.use(bodyParser.json());

// Enable CORS for both localhost and 127.0.0.1
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));

// 🟢 Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit on failure
    });

// 🟢 Routes
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/tasks', taskRoutes);

// 🟡 Catch-All for Undefined Routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// 🔴 Global Error Handler
app.use((err, req, res, next) => {
    console.error('❗ Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 🟢 Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});