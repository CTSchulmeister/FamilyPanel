'use strict';

// --- Modules
const jwt = require('jsonwebtoken');
const UserModel = require('../user/user.model');
const config = require('../../config');

const auth = async (req, res, next) => {
    try {
        const jwtKey = process.env.JWT_KEY || config.JWT_KEY;

        if(!req.header('Authorization')) {
            throw new Error(`Malformed request`);
        }

        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, jwtKey);

        const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token }).exec();

        if(!user) {
            throw new Error(`Not authorized to access this resource`);
        }

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(400).json({
            success: false,
            errors: [err.message]
        });
    }
};

module.exports = auth;

