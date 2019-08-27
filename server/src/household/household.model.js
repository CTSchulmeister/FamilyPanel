'use strict';

// --- Modules
const mongoose = require('mongoose');

// --- Schemas
const EventSchema = new mongoose.Schema({
    _creatorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        default: 'Untitled Event'
    },
    description: String,
    time: {
        type: Date,
        default: Date.now
    },
    location: String
});

const NoteSchema = new mongoose.Schema({
    _creatorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        default: 'Untitled Note'
    },
    body: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

const TaskSchema = new mongoose.Schema({
    _creatorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _assignedUserIds: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        default: "Untitled Task"
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});

TaskSchema.pre('save', function(next) {
    if(this._assignedUserIds.length == 0) {
        this._assignedUserIds = this.ownerDocument()._memberIds;
    }

    let creatorIdInAssignedUsers = false;

    for(let i = 0; i < this._assignedUserIds.length; i++) {
        if(mongoose.Types.ObjectId(this._assignedUserIds[i]).equals(mongoose.Types.ObjectId(this._creatorId))) {
            creatorIdInAssignedUsers = true;
        }
    }

    if(!creatorIdInAssignedUsers) this._assignedUserIds.push(this._creatorId);
    
    next();
});

const HouseholdSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _memberIds: {
        type: Array,
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

HouseholdSchema.pre('save', function(next) {
    if(Object.values(this._memberIds).indexOf(this._ownerId) == -1) {
        this._memberIds.push(this._ownerId);
    }
    next();
});

const Household = mongoose.connection.model('Household', HouseholdSchema);

module.exports = Household;