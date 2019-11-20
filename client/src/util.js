import crypto from 'crypto';

/**
 * @descriptions Hashes a password using sha256
 * @param {String} password 
 * @returns {String}
 */
export const hashPassword = password => crypto.createHash('sha256').update(password).digest('hex');