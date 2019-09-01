'use strict';

// --- Modules
const UserModel = require('./user.model');
const HouseholdModel = require('../household/household.model');
const crypto = require('crypto');
const mongoose = require('mongoose');

// --- Controller Logic

/**
 * Generates an 8 character salt.
 */
const generateSalt = () => {
    return crypto.randomBytes(8).toString('hex').slice(0, 8);
}

/**
 * Hashes a password with the passed salt.
 * @param {String} password 
 * @param {String} salt 
 */
const generateHash = (password, salt) => {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    hash = hash.digest('hex');

    return hash;
};

/**
 * Creates a user.
 * @param {String} firstName - The first name of the user.
 * @param {String} lastName - The last name of the user.
 * @param {String} email - The user's email.
 * @param {String} password - The user's unhashed password.
 */
module.exports.createUser = async (firstName, lastName, email, password) => {
    const salt = generateSalt();
    const hashedPassword = generateHash(password, salt);

    if(await UserModel.findOne({ email: email }).exec() != null) {
        throw new Error(`A user with the email ${ email } already exists`);
    }

    const user = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        salt: salt
    });

    user.validate((err) => {
        if(err) throw err;
    });

    return await user.save();
};

/** 
 * Retrieves a user document by id.
 * @param {mongoose.Types.ObjectId} id - The user's _id value.
 */
module.exports.readUser = async (id) => {
    const user = await UserModel.findById(id).exec();

    if(!user) throw new Error(`User with id ${ id } does not exist`);

    return user;
};

/**
 * Updates a user document by id given update parameters.
 * @param {mongoose.Types.ObjectId} id - The user's id.
 * @param {String} [firstName] - The user's new first name.
 * @param {String} [lastName] - The user's new last name.
 * @param {String} [email] - The user's new email.
 * @param {String} [password] - The user's unhashed password.
 */
module.exports.updateUser = async (id, firstName = null, lastName = null, email = null, password = null) => {
    let update = {};

    if(firstName) update.firstName = firstName;
    if(lastName) update.lastName = lastName;
    if(email) update.email = email;
    if(password) {
        const salt = generateSalt();
        const hashedPassword = generateHash(password, salt);

        update.password = hashedPassword;
        update.salt = salt;
    }

    if(Object.entries(update).length === 0 && update.constructor === Object) {
        throw new Error(`No values were passed to update the user with id ${ id }`);
    }

    const user = await UserModel.findByIdAndUpdate(id, update, { new: true}).exec();

    if(!user) throw new Error(`User with id ${ id } does not exist`);

    return user;
};

/**
 * Deletes a user document by id.
 * @param {mongoose.Types.ObjectId} id - The user's id.
 */
module.exports.deleteUser = async (id) => {
    await HouseholdModel.deleteMany({ _ownerId: id }).exec();

    let households = await HouseholdModel.find({ _memberIds: id }).exec();

    households.forEach(async household => {
        household._memberIds.splice(household._memberIds.indexOf(id), 1);

        household.events.forEach((event, index) => {
            if(event._creatorId.equals(id)) {
                household.events.splice(index, 1);
            }
        });

        household.tasks.forEach((task, index) => {
            if(task._creatorId.equals(id)) {
                household.tasks.splice(index, 1);
            } else {
                task._assignedUserIds.forEach((userId, index) => {
                    if(userId.equals(id)) {
                        task._assignedUserIds.splice(index, 1);
                    }
                });
            }
        });

        household.notes.forEach((note, index) => {
            if(note._creatorId.equals(id)) {
                household.notes.splice(index, 1);
            }
        });

        await household.save();
    });

    const user = await UserModel.findByIdAndDelete(id).exec();

    if(!user) throw new Error(`User with id ${ id } does not exist`);

    return user;
}