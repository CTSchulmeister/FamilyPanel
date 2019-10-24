'use strict';

// --- Modules
const UserModel = require('./user.model');
const HouseholdModel = require('../household/household.model');
const { generateSalt, generateHash, nonPersonalUserData } = require('../util');
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
    const user = await UserModel.findOne({ email: email }).exec();

    if(!user) {
        throw `Invalid login credentials`;
    }

    const hashedPassword = generateHash(password, user.salt);

    if(hashedPassword != user.password) {
        throw `Invalid login credentials`;
    }

    const token = await user.generateAuthToken();

    let households = null;
    let currentHousehold = null;

    if(user._householdIds.length !== 0) {
        households = await HouseholdModel.find({ _id: { $in: user._householdIds } }).exec();

        for(let household = 0; household < households.length; household++) {
            if(households[0]._id = user.currentHousehold) {
                currentHousehold = {
                    ...households[0]
                };
                break;
            }
        }

        let members = await getHouseholdMembers(currentHousehold._doc._id);

        currentHousehold = {
            ...currentHousehold._doc,
            members: members
        };
    }

    return { user, token, households, currentHousehold };
};

/**
 * Retrieves all households contains the passed user id.
 * @param {String} userId - The user's _id.
 */
module.exports.getHouseholds = async (userId) => {
    const households = await HouseholdModel.find({ _memberIds: userId }).exec();

    if(!households) {
        throw new Error(`No households were found that had a member with the id ${ userId }`);
    }

    return households;
}

/**
 * Changes the user's current household.
 * @param {String} userId - The id of the user
 * @param {String} householdId - The id of the household
 */
module.exports.changeCurrentHousehold = async (userId, householdId) => {
    let newCurrentHousehold = await HouseholdModel.findById(householdId).exec();

    if(!newCurrentHousehold || !newCurrentHousehold._memberIds.includes(userId)) {
        throw new Error('The user does not have access to this household');
    }

    const user = await UserModel.findByIdAndUpdate(userId, {
        currentHousehold: householdId
    }, { new: true }).exec();

    if(!user) {
        throw new Error(`No user with the id ${ userId } was found`);
    }

    let members = await getHouseholdMembers(newCurrentHousehold._id);

    newCurrentHousehold = {
        ...newCurrentHousehold._doc,
        members: members
    };

    return newCurrentHousehold;
};

/** 
 * Retrieves a user document by id.
 * @param {String} id - The user's _id value.
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
 * @param {String} id - The user's id.
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
 * @param {String} id - The user's id.
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

// HELPER METHODS

/**
 * Gets the member user documents of a household with personal data removed.
 * @param {String} householdId
 */
const getHouseholdMembers = async householdId => {
    const members = await UserModel.find({ _householdIds: householdId }, nonPersonalUserData).exec();

    return members;
};