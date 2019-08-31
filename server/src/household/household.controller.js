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
    memberIds = (memberIds.length > 0) ? memberIds : [ownerId];
    if(!memberIds.includes(ownerId)) memberIds.push(ownerId);

    if(await UserModel.countDocuments({ _id: { $in: memberIds } }) != memberIds.length) {
        throw new Error(`At least one user in memberIds does not exist`);
    }

    let household = await new HouseholdModel({
        _ownerId: ownerId,
        _memberIds: memberIds,
        name: name
    })
    
    household.validate((err) => {
        if(err) throw err;
    });

    household = await household.save();

    await UserModel.updateMany({ _id: { $in: memberIds }}, { $push: { _householdIds: household._id } }).exec();

    return household;
};

/**
 * Retrieves a household document by id.
 * @param {mongoose.Types.ObjectId} id - The household's _id value.
 */
module.exports.readHousehold = async (id) => {
    const household = await HouseholdModel.findById(id).exec();

    if(!household) throw new Error(`Household with id ${ id } does not exist`);

    return household;
};

/**
 * Updates a household document by id given update parameters.
 * Pass null to fields not being update.
 * @param {mongoose.Types.ObjectId} id - The household's id.
 * @param {mongoose.Types.ObjectId} [ownerId] - The household's new ownerId.
 * @param {Array<mongoose.Types.ObjectId>} [memberIds] - The household's new array of memberIds.
 * @param {String} [name] - The household's new name.
 */
module.exports.updateHousehold = async (id, ownerId = null, memberIds = null, name = null) => {
    let update = {};

    if(!ownerId && !memberIds && !name) {
        throw new Error(`No values were passed to update the household with id ${ id }`);
    }

    if(ownerId) update._ownerId = ownerId;
    if(memberIds) update._memberIds = memberIds;
    if(name) update.name = name;

    const household = await HouseholdModel.findByIdAndUpdate(id, update, { new: true }).exec();

    if(!household) throw new Error(`Household with id ${ id } does not exist`);

    return household;
};

/**
 * Deletes a household document by id.
 * @param {mongoose.Types.ObjectId} id - The household's id.
 */
module.exports.deleteHousehold = async (id) => {
    await UserModel.updateMany({ _householdIds: id }, { $pull: { _householdIds: id } }).exec();

    const household = await HouseholdModel.findByIdAndDelete(id).exec();

    if(!household) throw new Error(`Household with id ${ id } does not exist`);

    return household;
};

// --- Event Controller Logic

/**
 * Creates a new event document.
 * @param {mongoose.Types.householdId} householdId - The _id of the household document this event belongs to.
 * @param {mongoose.Types.creatorId} creatorId - The _id of the user creating the event.
 * @param {String} title - The title of the event.
 * @param {Date} [time] - The datetime of the event.
 * @param {String} [description] - The event's description.
 * @param {Array<Number>} [location] - The event's location [longitude, latitute].
 */
module.exports.createEvent = async (householdId, creatorId, title, time = Date.now(), description = null, location = null) => {
    let household = await HouseholdModel.findById(householdId).exec();

    if(!household) {
        throw new Error(`Household with id ${ id } does not exist`);
    }

    const user = await UserModel.findById(creatorId).exec()

    if(user == null) {
        throw new Error(`User with id ${ creatorId } does not exist`);
    }

    if(!user._householdIds.includes(householdId)) {
        throw new Error(`User with id ${ creatorId } does not belong to household ${ householdId }`);
    }

    let newEvent = {
        _creatorId: creatorId,
        title: title,
        time: time
    };

    if(description) newEvent.description = description;
    if(location) newEvent.location = location;

    const event = await household.events.create(newEvent);

    return event;
};

/**
 * Retrieves an event document by id.
 * @param {mongoose.Types.ObjectId} id - The event's _id.
 */
module.exports.readEvent = async (id) => {
    const household = await HouseholdModel.findOne({ 'events._id': id }).exec();

    if(!household) throw new Error(`No household had an event with the id ${ id }`);

    const event = household.events.id(id);

    return event;
}

/**
 * Updates an event document.
 * @param {mongoose.Types.ObjectId} householdId - The id of the househld this event belongs to.
 * @param {mongoose.Types.ObjectId} eventId - The event's _id.
 * @param {String} [title] - The event's new title.
 * @param {Date} time - The event's new datetime.
 * @param {String} description - The event's new description.
 * @param {Array<Number>} location - The event's new location [longitude, latitude].
 */
module.exports.updateEvent = async (householdId, eventId, title = null, time = null, description = null, location = null) => {
    let update = {};

    if(!title && !time && !description && !location) {
        throw new Error(`No values were passed to update the event with id ${ eventId }`);
    }

    if(title) update['events.$.title'] = title;
    if(time) update['events.$.time'] = time;
    if(description) update['events.$.description'] = description;
    if(location) update['events.$.location'] = location;
    
    const household = await HouseholdModel.findOneAndUpdate(
        { _id: householdId, 'events._id': eventId },
        update,
        { new: true }
    ).exec();

    if(!household) throw new Error(`The household ${ householdId} does not have an event with the id ${ eventId }`);

    const event = household.events.id(eventId);

    if(!event) throw new Error(`No event with the id ${ eventId } could be found`);

    return event;
};

/**
 * Deletes an event document.
 * @param {mongoose.Types.ObjectId} id - The event's _id.
 */
module.exports.deleteEvent = async (id) => {
    const household = await HouseholdModel.findOne({ 'events._id': id }).exec();
    const event = household.events.id(id);

    if(!household || !event) throw new Error(`Event with id ${ id } does not exist`);

    await HouseholdModel.findByIdAndUpdate(household._id, { $pull: { events: { _id: id } } }).exec();

    return event;
};

// --- Task Controller Logic

// --- Note Controller Logic
