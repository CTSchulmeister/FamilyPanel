'use strict';

// --- Modules
const UserModel = require('./user.model');
const HouseholdModel = require('../household/household.model');
const { generateSalt, generateHash }= require('../util');
const mongoose = require('mongoose');

// --- Controller Logic

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
        throw `A user with the email ${ email } already exists`;
    }

    let user = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        salt: salt
    });

    user.validate((err) => {
        if(err) throw err;
    });

    user = await user.save();

    const token = await user.generateAuthToken();

    user.password = undefined;
    user.salt = undefined;

    return { user, token };
};

/**
 * Logs in as a user with the passed credentials.
 * @param {String} email - The user's email.
 * @param {String} password - The user's unhashed password.
 */
module.exports.loginUser = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email }).exec();

        if(!user) {
            throw `Invalid login credentials`;
        }

        const hashedPassword = generateHash(password, user.salt);

        if(hashedPassword != user.password) {
            throw `Invalid login credentials`;
        }

        const token = await user.generateAuthToken();

        return { user, token };
    } catch (err) {
        throw err;
    }
};

/** 
 * Retrieves a user document by id.
 * @param {mongoose.Types.ObjectId} id - The user's _id value.
 */
module.exports.readUser = async (id) => {
    let user = await UserModel.findById(id).exec();

    if(!user) throw `User with id ${ id } does not exist`;

    user.password = undefined;
    user.salt = undefined;

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
        throw `No values were passed to update the user with id ${ id }`;
    }

    let user = await UserModel.findByIdAndUpdate(id, update, { new: true}).exec();

    if(!user) throw `User with id ${ id } does not exist`;

    user.password = undefined;
    user.salt = undefined;

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

    let user = await UserModel.findByIdAndDelete(id).exec();

    if(!user) throw new Error(`User with id ${ id } does not exist`);

    user.password = undefined;
    user.salt = undefined;

    return user;
}