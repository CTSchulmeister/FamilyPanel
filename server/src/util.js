'use strict';

// --- Modules
const crypto = require('crypto');

// --- Functions

/**
 * Generates a random 8 character salt.
 */
module.exports.generateSalt = () => {
    return crypto.randomBytes(8).toString('hex').slice(0, 8);
};

/**
 * Hashes a password with the passed salt.
 * @param {String} password
 * @param {String} salt
 */
module.exports.generateHash = (password, salt) => {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    hash = hash.digest('hex');

    return hash;
};

/**
 * @description Checks if a password meets the password requirements:
 *  - At least one letter
 *  - At least one number
 *  - At least one special character
 *  - At least 8 characters long
 * @param {String} password
 * @returns {Boolean}
 */
module.exports.checkPasswordFormat = (password) => {
    const passwordFormat = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    return passwordFormat.test(password);
};