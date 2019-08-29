'use strict';

// --- Modules
const mongoose = require('mongoose');
const HouseholdModel = require('./household.model');
const UserModel = require('../user/user.model');

// --- Household Controller Logic

/**
 * Creates a household.
 * @param {mongoose.Types.ObjectId} ownerId - The id of the household's owner.
 * @param {Array<mongoose.Types.ObjectId} memberIds - An array of the ids of the household's members.
 * @param {String} name - The household's name.
 */
module.exports.createHousehold = async (ownerId, memberIds, name) => {
    try {
        memberIds = (memberIds.length > 0) ? memberIds : [ownerId];

        const household = new HouseholdModel({
            _ownerId: ownerId,
            _memberIds: memberIds,
            name: name
        });

        household.validate((err) => {
            if(err) throw err;
        });

        return await household.save();
    } catch (err) {
        throw err;
    }
};

/**
 * Retrieves a household document by id.
 * @param {mongoose.Types.ObjectId} id - The household's _id value.
 */
module.exports.readHousehold = async (id) => {
    try {
        const household = await HouseholdModel.findById(id).exec();

        if(!household) throw new Error(`Household with id ${ id } does not exist`);

        return household;
    } catch (err) {
        throw err;
    }
};

/**
 * Updates a household document by id given update parameters.
 * Pass null to fields not being update.
 * @param {mongoose.Types.ObjectId} id - The household's id.
 * @param {mongoose.Types.ObjectId} ownerId - The household's new ownerId.
 * @param {Array<mongoose.Types.ObjectId>} memberIds - The household's new array of memberIds.
 * @param {String} name - The household's new name.
 */
module.exports.updateHousehold = async (id, ownerId, memberIds, name) => {
    try {
        let update = {};

        if(ownerId) update._ownerId = ownerId;
        if(memberIds) update._memberIds = memberIds;
        if(name) update.name = name;

        const household = await HouseholdModel.findByIdAndUpdate(id, update, { new: true}).exec();

        if(!household) throw new Error(`Household with id ${ id } does not exist`);

        return household;
    } catch (err) {
        throw err;
    }
};

/**
 * Deletes a household document by id.
 * @param {mongoose.Types.ObjectId} id - The household's id.
 */
module.exports.deleteHousehold = async (id) => {
    try {
        let users = await UserModel.find({ _householdIds: id }).exec();

        users.forEach(async user => {
            user._householdIds.splice(user._householdIds.indexOf(id), 1);

            await user.save();
        });

        const household = await HouseholdModel.findByIdAndDelete(id).exec();

        if(!household) throw new Error(`Household with id ${ id } does not exist`);

        return household;
    } catch (err) {
        throw err;
    }
};

// --- Event Controller Logic

// --- Task Controller Logic

// --- Note Controller Logic
