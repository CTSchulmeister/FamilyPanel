// --- Modules
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// --- Schema
const HouseholdSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        unique: true
    },
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
    _eventIds: {
        type: Array,
        required: true,
        default: []
    },
    _taskIds: {
        type: Array,
        required: true,
        default: []
    },
    _noteIds: {
        type: Array,
        required: true,
        default: []
    } 
}, {
    _id: false
});

HouseholdSchema.plugin(autoIncrement);

const Household = mongoose.connection.model('Household', HouseholdSchema);

module.exports = Household;