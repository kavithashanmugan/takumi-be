const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    boardId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    assignedTo: { type: String },
    dueDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
