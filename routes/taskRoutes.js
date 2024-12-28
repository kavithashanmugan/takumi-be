const express = require('express');
const Task = require('../models/task');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.get('/board/:boardId', async (req, res) => {
    try {
        const { boardId } = req.params;
        const tasks = await Task.find({ boardId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.get('/board/:boardId/status/:status', async (req, res) => {
    try {
        const { boardId, status } = req.params;
        const tasks = await Task.find({ boardId, status });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create task' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getTask = await Task.findById(id);
        res.status(200).json(getTask);
    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch task' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update task' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete task' });
    }
});

router.put('/:id/move', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['todo', 'in-progress', 'done'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: 'Failed to move task' });
    }
});

module.exports = router;
