"use strict";

// --- Modules
const mongoose = require('mongoose');
const crypto = require('crypto');
const autoIncrement = require('mongoose-sequence')(mongoose);

// --- Schema
const UserSchema = new mongoose.Schema({
    _id: Number,
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

UserSchema.plugin(autoIncrement);

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