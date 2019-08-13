// --- Modules
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// --- Schema
const EventSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    _householdId: {
        type: Number,
        required: true
    },
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
}, {
    _id: false
});

EventSchema.plugin(autoIncrement);

const Event = mongoose.connection.model('Event', EventSchema);

module.exports = Event;