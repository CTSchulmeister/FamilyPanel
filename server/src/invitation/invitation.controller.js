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

        const household = await HouseholdModel.findById(householdId).exec();

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
        if(!validator.isEmail(recieverEmail)) {
            throw new Error(`${ recieverEmail } is not an email.`);
        }

        const invitations = await InvitationModel.find({
            recieverEmail: recieverEmail
        }).exec();

        return invitations;
    } catch (e) {
        throw e;
    }
};

module.exports.acceptInvitation = async (invitationId) => {

};