// import express from 'express';
// import Task from '../models/Task.js';

// const router = express.Router();

// // Accept Task (Volunteer accepts a task)
// router.put('/:taskId/accept', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.taskId, {
//             status: 'accepted',
//             assignedTo: req.body.volunteerId,
//         }, { new: true });

//         if (!task) return res.status(404).json({ error: 'Task not found' });

//         res.status(200).json({ message: 'Task accepted', task });
//     } catch (error) {
//         console.error('Error accepting task:', error);
//         res.status(500).json({ error: 'Error accepting task' });
//     }
// });

// // Export the router
// export default router;



// backend/routes/taskRoutes.js
import express from 'express';
import Task from '../models/Task.js';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// 1. Create Task (Elderly User Submits a Request)
router.post('/', async (req, res) => {
    try {
        const { helpType, urgency, preferredTime, location, budget, createdBy } = req.body;

        // Input Validation
        if (!helpType || !urgency || !location || !budget || !createdBy) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const newTask = new Task({
            helpType,
            urgency,
            preferredTime,
            location,
            budget,
            createdBy
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });

    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Error creating task' });
    }
});

// 2. Accept Task (Volunteer accepts a task)
router.put('/:taskId/accept', async (req, res) => {
    try {
        const { volunteerId } = req.body;

        if (!volunteerId) {
            return res.status(400).json({ error: 'Volunteer ID is required' });
        }

        const task = await Task.findByIdAndUpdate(req.params.taskId, {
            status: 'accepted',
            assignedTo: volunteerId,
        }, { new: true }).populate('createdBy', 'name contact'); //changes

        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Provide Elder's Contact Info to Volunteer
        const elderContact = task.createdBy.contact;

        res.status(200).json({
            message: 'Task accepted successfully',
            task,
            elderContact: elderContact || 'Contact not available',
        }); //changes

    } catch (error) {
        console.error('Error accepting task:', error);
        res.status(500).json({ error: 'Error accepting task' });
    }
});

// 3. Reject Task (Volunteer rejects a task)
// Reject Task (taskRoutes.js)
router.put('/:taskId/reject', async (req, res) => {
    try {
        const { rejectionMessage = 'Task rejected by volunteer.' } = req.body;

        const task = await Task.findByIdAndUpdate(req.params.taskId, {
            status: 'rejected',
            rejectionMessage: rejectionMessage || 'Task rejected by volunteer.',
        }, { new: true });

        if (!task) return res.status(404).json({ error: 'Task not found' });

        res.status(200).json({ message: 'Task rejected successfully', task });
    } catch (error) {
        console.error('Error rejecting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// 4. Get Pending Tasks (For Volunteers to View Available Tasks)
router.get('/pending', async (req, res) => {
    try {
        const tasks = await Task.find({ status: 'pending' }).populate('createdBy', 'name contact location');
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Export the router
export default router;
