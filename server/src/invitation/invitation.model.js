'use strict';

// --- Modules
const mongoose = require('mongoose');

// --- Schema
const InvitationSchema = new mongoose.Schema({
    _householdId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _senderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _recieverId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    sent: {
        type: Date,
        default: Date.now()
    },
    message: String
}, {
    toObject: {
        virtuals: true
    },
    toJson: {
        virtuals: true
    }
});

const Invitation = mongoose.connection.model('Invitation', InvitationSchema);

module.exports = Invitation;