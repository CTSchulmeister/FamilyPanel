'use strict';

// --- Modules
const mongoose = require('mongoose');

// --- Schema
const UserSchema = new mongoose.Schema({
    _householdIds: Array,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hasVerifiedEmail: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJson: {
        virtuals: true
    }
});

UserSchema.virtual('fullName').get(() => {
    return `${ this.firstName } ${ this.lastName}`;
});

const User = mongoose.connection.model('User', UserSchema);

module.exports = User;