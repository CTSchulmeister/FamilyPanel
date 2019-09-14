'use strict';

// --- Modules
const mongoose = require('mongoose');
const InvitationModel = require('./invitation.model');
const HouseholdModel = require('../household/household.model');
const UserModel = require('../user/user.model');

// --- Invitation Controller Logic

module.exports.createInvitation = async (householdId, senderId, recieverId) => {
    const household = await HouseholdModel.findById(householdId).exec();

    if(household._memberIds.includes(senderId)) {
        if(household.settings.allMembersCanInvite === false && senderId != household._ownerId) {
            throw new Error(`Only the owner of this household can invite members`);
        } else {
            const invitation = await new InvitationModel({
                _householdId: householdId,
                _senderId: senderId,
                _recieverId: recieverId
            }).save();

            return invitation;
        }
    } else {
        throw new Error(`You are not allowed to invite members to this household`);
    }
};

module.exports.readInvitation = async (id) => {
    const invitation = await InvitationModel.findById(id).exec();

    if(!invitation) throw new Error(`An invitation with the id ${ id } does not exist`);
};

module.exports.readInvitationsByRecieverId = async (recieverId) => {
    const invitations = await InvitationModel.find({ _recieverId: recieverId }).exec();

    if(invitations.length === 0) throw new Error(`No invitations exist for this user`);

    return invitations;
};

module.exports.readInvitationsBySenderId = async (senderId) => {
    const invitations = await InvitationModel.find({ _recieverId: recieverId }).exec();

    if(invitations.length === 0) throw new Error(`No invitations exist for this user`);

    return invitations;
};

module.exports.readInvitationsByHouseholdId = async (householdId) => {

};