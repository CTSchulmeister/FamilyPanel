'use strict';

// --- Modules
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { generateHash } = require('../util');

// --- Schema
const UserSchema = new mongoose.Schema({
    _householdIds: Array,
    currentHousehold: mongoose.Types.ObjectId,
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
        unique: true,
        lowercase: true
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    toObject: {
        virtuals: true
    },
    toJson: {
        virtuals: true
    }
});

UserSchema.virtual('fullName').get(function() {
    return `${ this.firstName } ${ this.lastName}`;
});

/**
 * Generates an authentication token for this user.
 */
UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

UserSchema.pre('save', function() {
    this.email = this.email.toLowerCase();
});

const User = mongoose.connection.model('User', UserSchema);

module.exports = User;