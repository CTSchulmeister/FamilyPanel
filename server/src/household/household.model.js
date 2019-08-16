// --- Modules
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// --- Schemas
const EventSchema = new mongoose.Schema({
    _id: Number,
    _creatorId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled Event'
    },
    description: String,
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    location: String
});

EventSchema.plugin(autoIncrement);

const NoteSchema = new mongoose.Schema({
    _id: Number,
    _creatorId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled Note'
    },
    body: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: Date
});

NoteSchema.plugin(autoIncrement);

const TaskSchema = new mongoose.Schema({
    _id: Number,
    _creatorId: {
        type: Number,
        required: true
    },
    _assignedUserIds: {
        type: Array,
        required: true,
        default: []
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
});

TaskSchema.plugin(autoIncrement);

const HouseholdSchema = new mongoose.Schema({
    _id: Number,
    _ownerId: {
        type: Number,
        required: true
    },
    _memberIds: {
        type: Array,
        required: true,
        default: []
    },
    name: {
        type: String,
        required: true
    },
    events: {
        type: [EventSchema],
        default: []
    },
    tasks: {
        type: [TaskSchema],
        default: []
    },
    notes: {
        type: [NoteSchema],
        default: []
    }
});

HouseholdSchema.plugin(autoIncrement);

const Household = mongoose.connection.model('Household', HouseholdSchema);

module.exports = Household;