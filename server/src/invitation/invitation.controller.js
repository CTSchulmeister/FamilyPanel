'use strict';

// --- Modules
const mongoose = require('mongoose');
const validator = require('validator');
const InvitationModel = require('./invitation.model');
const HouseholdModel = require('../household/household.model');
const UserModel = require('../user/user.model');
const {
    throwInvalidObjectIdError,
    nonPersonalUserData
} = require('../util');

const ObjectId = mongoose.Types.ObjectId;

// --- Invitation Controller Logic

/**
 * @description Creates an invitation document
 * @param {String | mongoose.Types.ObjectId} householdId
 * @param {String | mongoose.Types.ObjectId} senderId
 * @param {String} recieverEmail
 * @param {String} [message]
 * @return {Promise<mongoose.Document>}
 */
module.exports.createInvitation = async (householdId, senderId, recieverEmail, message = null) => {
    try {
        // Input Validation
        if(!validator.isEmail(recieverEmail)) {
            throw new Error(`${ recieverEmail } is not an email.`);
        }

        if(!ObjectId.isValid(householdId)) throwInvalidObjectIdError('householdId', householdId);
        if(!ObjectId.isValid(senderId)) throwInvalidObjectIdError('senderId', senderId);

        // Cast to ObjectId
        householdId = ObjectId(householdId);
        senderId = ObjectId(senderId);

        const duplicateInvitation = await InvitationModel.findOne({
            _householdId: householdId,
            recieverEmail: recieverEmail
        }).exec();

        if(duplicateInvitation !== null) {
            throw new Error(`An invitation like this already exists.`);
        }

        const household = await HouseholdModel.findOne({
            _id: householdId,
            _memberIds: senderId
        }).exec();

        if(household === null) {
            throw new Error(`No household with the id ${ householdId } could be found.`);
        }

        if(household.settings.allMembersCanInvite === false && String(household._ownerId) !== String(senderId)) {
            throw new Error(`The user ${ senderId } is not allowed to create invitations for household ${ householdId }.`);
        }

        // Invitation creation
        const invitation = await new InvitationModel({
            _householdId: householdId,
            _senderId: senderId,
            recieverEmail: recieverEmail,
            sent: Date.now(),
            message: message
        }).save();

        return invitation;
    } catch (e) {
        throw e;
    }
};

/**
 * @description Deletes an invitation, issued by the sender
 * @param {String | mongoose.Types.ObjectId} invitationId
 * @param {String} senderId
 * @returns {Promise<mongoose.Document>}
 */
module.exports.deleteInvitationBySender = async (invitationId, senderId) => {
    try {
        // Input validation
        if(!ObjectId.isValid(invitationId)) throwInvalidObjectIdError('invitationId', invitationId);
        if(!ObjectId.isValid(senderId)) throwInvalidObjectIdError('senderId', senderId);

        // Delete invitation
        const deletedInvitation = await InvitationModel.findOneAndDelete({
            _id: invitationId,
            _senderId: senderId
        }).lean().exec();

        if(!deletedInvitation) throw new Error(`No invitation could be found matching the query data.`);

        return;
    } catch (e) {
        throw e;
    }
};

/**
 * @description Deletes an invitation, issued by the reciever
 * @param {String | mongoose.Types.ObjectId} invitationId
 * @param {String} recieverEmail
 * @returns {Promise<mongoose.Document>}
 */
module.exports.deleteInvitationByReciever = async (invitationId, recieverEmail) => {
    try {
        // Input validation
        if(!ObjectId.isValid(invitationId)) throwInvalidObjectIdError('invitationId', invitationId);
        if(!validator.isEmail(recieverEmail)) throw new Error(`${ recieverEmail } is not an email.`);

        // Delete invitation
        const deletedInvitation = await InvitationModel.findOneAndDelete({
            _id: invitationId,
            recieverEmail: recieverEmail
        }).lean().exec()

        if(!deletedInvitation) throw new Error(`No invitation could be found matching the query data.`);

        return;
    } catch (e) {
        throw e;
    }
};

/**
 * @description Gets all invitations related to the passed recieverEmail
 * @param {String} recieverEmail
 * @returns {Promise<Array<mongoose.Document>>}
 */
module.exports.getInvitationsByRecieverEmail = async (recieverEmail) => {
    try {
        // Input validation
        if(!validator.isEmail(recieverEmail)) {
            throw new Error(`${ recieverEmail } is not an email.`);
        }

        // Invitation querying
        let invitations = await InvitationModel.find({
            recieverEmail: recieverEmail
        }).lean().exec();

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

        return invitations;
    } catch (e) {
        throw e;
    }
};

/**
 * @description Accepts an invitation, adding the reciever to a household
 * @param {String | mongoose.Types.ObjectId} invitationId
 * @param {String | mongoose.Types.ObjectId} recieverId
 */
module.exports.acceptInvitation = async (invitationId, recieverId) => {
    try {
        // Input validation
        if(!ObjectId.isValid(invitationId)) throwInvalidObjectIdError('invitationId', invitationId);
        if(!ObjectId.isValid(recieverId)) throwInvalidObjectIdError('recieverId', recieverId);

        // Invitation acceptance
        const user = await UserModel.findById(recieverId).exec();

        if(!user) {
            throw new Error(`No user with the id ${ recieverId } could be found.`);
        }

        const invitation = await InvitationModel.findById(invitationId).exec();

        if(!invitation) {
            throw new Error(`No invitation with the id ${ invitationId } could be found.`);
        }

        if(invitation.recieverEmail !== user.email) {
            throw new Error(`The invitation with the id ${ invitationId } does not match the user with the id ${ recieverId }.`);
        }

        await InvitationModel.findByIdAndDelete(invitationId).lean().exec();

        let household = await HouseholdModel.findByIdAndUpdate(invitation._householdId, {
            $push: { _memberIds: user._id }
        }, { new: true }).lean().exec();
        household = {
            ...household,
            members: await getHouseholdMembers(household._id)
        };

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
            $push: { _householdIds: invitation._householdId },
            currentHousehold: invitation._householdId
        }, { new: true }).lean().exec();

        return {
            updatedUser,
            household
        };
    } catch (e) {
        throw e;
    }
};

// Util
const getHouseholdMembers = async householdId => {
    const members = await UserModel.find({ _householdIds: householdId }, nonPersonalUserData).exec();

    return members;
};