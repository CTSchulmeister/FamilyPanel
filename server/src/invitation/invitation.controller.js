'use strict';

// --- Modules
const mongoose = require('mongoose');
const validator = require('validator');
const InvitationModel = require('./invitation.model');
const HouseholdModel = require('../household/household.model');
const UserModel = require('../user/user.model');

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

        if(householdId == null) {
            throw new Error(`The householdId argument must be a string representation of an objectId or an objectId.  Recieved: ${ householdId } (Type of ${ typeof householdId }).`);
        }

        if(senderId == null) {
            throw new Error(`The senderId argument must be a string represntation of an objectId or an objectId.  Recieved: ${ senderId } (Tyep of ${ typeof senderId }).`);
        }

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
 * @description Deletes an invitation document
 * @param {String | mongoose.Types.ObjectId} invitationId
 * @param {String | mongoose.Types.ObjectId} senderId
 * @return {Promise<mongoose.Document>}
 */
module.exports.deleteInvitation = async (invitationId, senderId) => {
    try {
        // Input validation
        if(invitationId === null) {
            throw new Error(`The invitationId argument must be a string representation of an objectId or an objectId.  Recieved ${ invitationId } (Type of ${ typeof invitationId }).`)
        }

        if(senderId === null) {
            throw new Error(`The senderId argument must be a string representation of an objectId or an objectId.  Recieved ${ senderId } (Type of ${ typeof senderId }).`);
        }

        // Invitation deletion
        const deletedInvitation = await InvitationModel.findOneAndDelete({
            _id: invitationId,
            _senderId: senderId
        }).exec();

        if(deletedInvitation === null) {
            throw new Error(`No invitation could be found with the id ${ invitationId } from a sender with the id ${ senderId }.`);
        }

        return deletedInvitation;
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
        const invitations = await InvitationModel.find({
            recieverEmail: recieverEmail
        }).exec();

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
        if(invitationId == null) {
            throw new Error(`The invitationId argument must be a string representation of an objectId or an objectId.  Recieved: ${ invitationId } (Type of ${ typeof invitationId }).`);
        }

        if(recieverId == null) {
            throw new Error(`The recieverId argument must be a string representation of an objectId or an objectId.  Recieved: ${ recieverId } (Type of ${ typeof recieverId }).`);
        }

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

        await InvitationModel.findByIdAndDelete(invitationId).exec();
        const household = await HouseholdModel.findByIdAndUpdate(invitation._householdId, {
            $push: { _memberIds: user._id }
        }).exec();
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
            $push: { _householdIds: invitation._householdId }
        }).exec();

        return {
            updatedUser,
            household
        };
    } catch (e) {
        throw e;
    }
};