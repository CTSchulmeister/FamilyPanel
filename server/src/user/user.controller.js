'use strict';

// --- Modules
const UserModel = require('./user.model');
const HouseholdModel = require('../household/household.model');
const InvitationModel = require('../invitation/invitation.model');
const { generateSalt, generateHash, nonPersonalUserData } = require('../util');
const validator = require('validator');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

// --- Controller Logic

/**
 * Creates a user.
 * @param {String} firstName - The first name of the user.
 * @param {String} lastName - The last name of the user.
 * @param {String} email - The user's email.
 * @param {String} password - The user's unhashed password.
 */
module.exports.createUser = async (firstName, lastName, email, password) => {
    try {
        const salt = generateSalt();
        const hashedPassword = generateHash(password, salt);

        if(await UserModel.findOne({ email: email }).lean().exec() !== null) {
            throw new Error(`A user with the email ${ email } already exists.`);
        }

        let user = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            salt: salt
        });
    
        user.validate((err) => { if(err) throw err; });

        user = await user.save();

        const token = await user.generateAuthToken();

        user.password = undefined;
        user.salt = undefined;

        const invitations = await InvitationModel.find({ 
            recieverEmail: email.toLowerCase()
        }).lean().exec();

        if(invitations.length > 0) {
            const householdIds = invitations.map(invitation => invitation._householdId);

            const householdNames = await HouseholdModel.find({
                _id: householdIds
            }, '_id name').lean().exec();

            for(let i = 0; i < invitations.length; i++) {
                for(let household of householdNames) {
                    if(invitations[i]._householdId = household._id) {
                        invitations[i] = {
                            ...invitations[i],
                            householdName: household.name
                        };
                        break;
                    }
                }
            }
        }

        return { user, token, invitations };
    } catch (e) {
        throw e;
    }
};

/**
 * Logs in as a user with the passed credentials.
 * @param {String} email - The user's email.
 * @param {String} password - The user's unhashed password.
 */
module.exports.loginUser = async (email, password) => {
    email = email.toLowerCase();

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
        households = await getHouseholds(user._householdIds);

        for(let household = 0; household < households.length; household++) {
            if(String(households[household]._id) === String(user.currentHousehold)) {
                currentHousehold = {
                    ...households[household]
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

    const invitations = await InvitationModel.find({ 
        recieverEmail: email 
    }).lean().exec();

    if(invitations.length > 0) {
        const householdIds = invitations.map(invitation => invitation._householdId);

        const householdNames = await HouseholdModel.find({
            _id: householdIds
        }, '_id name').lean().exec();

        for(let i = 0; i < invitations.length; i++) {
            for(let household of householdNames) {
                if(invitations[i]._householdId = household._id) {
                    invitations[i] = {
                        ...invitations[i],
                        householdName: household.name
                    };
                    break;
                }
            }
        }
    }

    return { user, token, households, currentHousehold, invitations };
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
const getHouseholdMembers = async householdId => await UserModel.find({ _householdIds: householdId }, nonPersonalUserData).exec();

const getHouseholds = async householdIds => await HouseholdModel.find({ _id: householdIds }).exec();