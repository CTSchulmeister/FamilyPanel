'use strict';

// --- Modules
const mongoose = require('mongoose');
const crypto = require('crypto');

// --- Schema
const UserSchema = new mongoose.Schema({
    _householdIds: {
        type: Array,
        default: []
    },
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
    salt: String
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

UserSchema.pre('save', function(next) {
    const user = this;

    const salt = crypto.randomBytes(8).toString('hex').slice(0, 8);

    let hash = crypto.createHmac('sha256', salt);
    hash.update(user.password);
    hash = hash.digest('hex');

    user.password = hash;
    user.salt = salt;

    next();
});

const User = mongoose.connection.model('User', UserSchema);

module.exports = User;