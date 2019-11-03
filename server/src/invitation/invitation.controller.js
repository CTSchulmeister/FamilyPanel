'use strict';

// --- Modules
const mongoose = require('mongoose');
const validator = require('validator');
const InvitationModel = require('./invitation.model');
const HouseholdModel = require('../household/household.model');
const UserModel = require('../user/user.model');

// --- Invitation Controller Logic

/**
 * @param {String} householdId
 * @param {String} senderId
 * @param {String} recieverEmail
 * @param {String} [message]
 */
module.exports.createInvitation = async (householdId, senderId, recieverEmail, message = null) => {
    try {
        // Input Validation
        if(!validator.isEmail(recieverEmail)) {
            throw new Error(`${ recieverEmail } is not an email.`);
        }

        if(householdId == null) {
            throw new Error(`The householdId argument must be a string representation of an objectId.  Recieved: ${ householdId }`);
        }

        if(senderId == null) {
            throw new Error(`The senderId argument must be a string represntation of an objectId.  Recieved: ${ senderId }`);
        }

        const household = await HouseholdModel.findById(householdId).exec();

        if(household.settings.allMembersCanInvite === false && String(household._ownerId) !== String(senderId)) {
            throw new Error(`The user ${ senderId } is not allowed to create invitations for household ${ householdId }`);
        }

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