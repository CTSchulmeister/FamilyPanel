// --- Modules
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// --- Schema
const NoteSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    _creatorId: {
        type: Number,
        required: true
    },
    _householdId: {
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
}, {
    _id: false
});

NoteSchema.plugin(autoIncrement);

const Note = mongoose.connection.model('Note', NoteSchema);

module.exports = Note;