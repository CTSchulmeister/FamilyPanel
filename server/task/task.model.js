// --- Modules
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// --- Schema
const TaskSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    _creatorId: {
        type: Number,
        required: true
    },
    _assignedUserIds: {
        type: Array,
        required: true,
        default: []
    },
    _householdId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "Untitled Task"
    },
    description: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    _id: false
});

TaskSchema.plugin(autoIncrement);

const Task = mongoose.connection.model('Task', TaskSchema);

module.exports = Task;