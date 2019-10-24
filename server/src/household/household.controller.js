'use strict';

// --- Modules
const mongoose = require('mongoose');
const HouseholdModel = require('./household.model');
const UserModel = require('../user/user.model');
const { nonPersonalUserData } = require('../util');

// --- Household Controller Logic

/**
 * Creates a household.
 * @param {String} ownerId - The id of the household's owner.
 * @param {Array<String} memberIds - An array of the ids of the household's members.
 * @param {String} name - The household's name.
 */
module.exports.createHousehold = async (ownerId, memberIds, name) => {
    memberIds = [...memberIds];
    memberIds = (memberIds.length > 0) ? memberIds : [ownerId];
    if(!memberIds.includes(ownerId)) memberIds.push(ownerId);

    if(await UserModel.countDocuments({ _id: { $in: memberIds } }) != memberIds.length) {
        throw new Error(`At least one user in memberIds does not exist`);
    }

    let newHousehold = await new HouseholdModel({
        _ownerId: ownerId,
        _memberIds: memberIds,
        name: name
    })
    
    newHousehold.validate((err) => {
        if(err) throw err;
    });

    newHousehold = await newHousehold.save();
    newHousehold = newHousehold._doc;

    await UserModel.updateMany({ _id: { $in: memberIds }}, { $push: { _householdIds: newHousehold._id } }).exec();

    newHousehold = {
        ...newHousehold,
        members: await getHouseholdMembers(newHousehold._id)
    };

    let updatedUser = await UserModel.findByIdAndUpdate(ownerId, {
        currentHousehold: newHousehold._id
    }, { new: true }).exec();
    let households = await HouseholdModel.find({ _id: updatedUser._householdIds }).exec();

    return { newHousehold, households, updatedUser };
};

/**
 * Retrieves a household document by id.
 * @param {String} id - The household's _id value.
 */
module.exports.readHousehold = async (id) => {
    let household = await HouseholdModel.findById(id).exec();

    if(!household) throw new Error(`Household with id ${ id } does not exist`);

    household = {
        ...household._doc,
        members: await getHouseholdMembers(household._id)
    };

    return household;
};

/**
 * Retrieves the members belonging to a household.
 * @param {String} householdId - The household's _id value.
 * @param {String} userId - The id of the user making the request.
 */
module.exports.getMembersFromHousehold = async (householdId, userId) => {
    const household = await HouseholdModel.findOne({ _id: householdId, _memberIds: userId }).exec();

    if(!household) {
        throw new Error(`No household has the id ${ householdId } with a member with the id ${ userId }`);
    }

    let members = await getHouseholdMembers(household._id);

    return members;
};

/**
 * Updates a household document by id given update parameters.
 * Pass null to fields not being update.
 * @param {String} id - The household's id.
 * @param {String} [ownerId] - The household's new ownerId.
 * @param {Array<String>} [memberIds] - The household's new array of memberIds.
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

    let updatedHousehold = await HouseholdModel.findByIdAndUpdate(id, update, { new: true }).exec();

    if(!updatedHousehold) throw new Error(`Household with id ${ id } does not exist`);

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

/**
 * Deletes a household document by id.
 * @param {String} id - The household's id.
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
 * @param {String} householdId - The _id of the household document this event belongs to.
 * @param {String} creatorId - The _id of the user creating the event.
 * @param {String} title - The title of the event.
 * @param {Date} [time] - The datetime of the event.
 * @param {String} [description] - The event's description.
 * @param {Array<Number>} [location] - The event's location [longitude, latitute].
 */
module.exports.createEvent = async (householdId, creatorId, title, time = Date.now(), description = null, location = null) => {
    const household = await HouseholdModel.findById(householdId).exec();

    if(!household) {
        throw new Error(`No household exists with the id ${ householdId }`);
    }

    const user = await UserModel.findById(creatorId).exec();

    if(!user) {
        throw new Error(`User with id ${ creatorId } does not exist`);
    }

    if(!household._memberIds.includes(creatorId) || !user._householdIds.includes(householdId)) {
        throw new Error(`User ${ creatorId } does not belong to household ${ householdId }`);
    }

    let event = {
        _creatorId: creatorId,
        title: title,
        time: time
    };

    if(description) event.description = description;
    if(location) event.location = location;

    let updatedHousehold = await HouseholdModel.findByIdAndUpdate(householdId, {
        $push: { events: event }
    }, { new: true }).exec();

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

/**
 * Retrieves an event document.
 * @param {String} householdId - The id of the household this event belongs to.
 * @param {String} eventId - The event's _id.
 */
module.exports.readEvent = async (householdId, eventId) => {
    const household = await HouseholdModel.findOne({ _id: householdId, 'events._id': eventId }).exec();

    if(!household) {
        throw new Error(`The household ${ householdId} does not have an event with the id ${ eventId }`);
    };

    const event = household.events.id(eventId);

    if(!event) {
        throw new Error(`Error retrieving event ${ eventId } from household ${ householdId }`)
    };

    return event;
}

/**
 * Updates an event document.
 * @param {String} householdId - The id of the househld this event belongs to.
 * @param {String} eventId - The event's _id.
 * @param {String} [title] - The event's new title.
 * @param {Date} [time] - The event's new datetime.
 * @param {String} [description] - The event's new description.
 * @param {Array<Number>} [location] - The event's new location [longitude, latitude].
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
    
    let updatedHousehold = await HouseholdModel.findOneAndUpdate(
        { _id: householdId, 'events._id': eventId },
        update,
        { new: true }
    ).exec();

    if(!updatedHousehold) {
        throw new Error(`The household ${ householdId } does not have an event with the id ${ eventId }`);
    }

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

/**
 * Deletes an event document.
 * @param {String} householdId - The id of the household this event belongs to.
 * @param {String} eventId - The event's _id.
 */
module.exports.deleteEvent = async (householdId, eventId) => {
    let updatedHousehold = await HouseholdModel.findOneAndUpdate(
        { _id: householdId, 'events._id': eventId },
        { $pull: { events: { _id: eventId } } },
        { new: true }
    ).exec();

    if(!updatedHousehold) {
        throw new Error(`The household ${ householdId} does not have an event with the id ${ eventId }`);
    }

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

// --- Task Controller Logic

/**
 * Creates a new task document.
 * @param {String} householdId - The id of the household this task will belong to.
 * @param {String} creatorId - The id of the user creating this task.
 * @param {String} title - The title of this task.
 * @param {Array<String} [assignedUserIds] - The users assigned to this task. Null will default to all users in the household.
 * @param {String} [description] - The description of this task.
 * @param {Date} [completeBy] - The datetime by which this task should be completed by.
 */
module.exports.createTask = async (householdId, creatorId, title, assignedUserIds = null, description = null, completeBy = null) => {
    const household = await HouseholdModel.findById(householdId).exec();

    if(!household) { 
        throw new Error(`No household exists with the id ${ householdId }`);
    }

    const creator = await UserModel.findById(creatorId).exec();

    if(!creator) {
        throw new Error(`User with id ${ creatorId } does not exist`);
    }

    if(!household._memberIds.includes(creatorId) || !creator._householdIds.includes(householdId)) {
        throw new Error(`User ${ creatorId } does not belong to household ${ householdId }`);
    }

    if(!assignedUserIds) {
        assignedUserIds = household._memberIds;
    } else {
        if(household._memberIds.some(member => assignedUserIds.indexOf(member) == -1)) {
            throw new Error(`At least one assigned user does not belong to household ${ householdId }`);
        }
    }

    let task = {
        _creatorId: creatorId,
        _assignedUserIds: assignedUserIds,
        title: title,
        createdAt: Date.now(),
    }

    if(description) task.description = description;
    if(completeBy) task.completeBy = completeBy;

    let updatedHousehold = await HouseholdModel.findByIdAndUpdate(householdId, {
        $push: { tasks: task }
    }, { new: true }).exec();

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

/**
 * Retrieves a task document.
 * @param {String} householdId - The id of the household this task belongs to.
 * @param {String} taskId - The note's id.
 */
module.exports.readTask = async (householdId, taskId) => {
    const household = await HouseholdModel.findOne({ _id: householdId, 'tasks._id': taskId }).exec();

    if(!household) {
        throw new Error(`The household ${ householdId } does not have a task with the id ${ taskId }`);
    }

    const task = household.tasks.id(taskId);

    if(!task) {
        throw new Error(`Error retrieving note ${ noteId } from household ${ householdId }`);
    }

    return task;
};

/**
 * Updates a task document.
 * @param {String} householdId - The id of the household this task belongs to.
 * @param {String} taskId - The task's id.
 * @param {Array<String>} [assignedUserIds] - The task's new assigned users.
 * @param {String} [title] - The task's new title.
 * @param {String} [description] - The task's new description.
 * @param {Date} [completeBy] - The task's new completion deadline.
 * @param {Boolean} [completed] - The task's new completion status.
 */
module.exports.updateTask = async (householdId, taskId, assignedUserIds = null, title = null, description = null, completeBy = null, completed = null) => {
    if(!assignedUserIds && !title && !description && !completeBy && !completed) {
        throw new Error(`No values were passed to update the note with id ${ noteId }`);
    }

    let update = {};

    if(assignedUserIds) {
        let household = await HouseholdModel.findOne({ _id: householdId, 'tasks._id': taskId }).exec();

        if(household._memberIds.some(member => assignedUserIds.indexOf(member) == -1)) {
            throw new Error(`At least one assigned user does not belong to household ${ householdId }`);
        } else {
            update['tasks.$._assignedUserIds'] = assignedUserIds;
        }
    }
    if(title) update['tasks.$.title'] = title;
    if(description) update['tasks.$.description'] = description;
    if(completeBy) update['tasks.$.completeBy'] = completeBy;
    if(completed) update['tasks.$.completed'] = completed;

    let updatedHousehold = await HouseholdModel.findOneAndUpdate(
        { _id: householdId, 'tasks._id': taskId },
        update,
        { new: true }
    ).exec();

    if(!updatedHousehold) {
        throw new Error(`The household ${ householdId } does not have a task with the id ${ taskId }`);
    }

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

/**
 * Deletes a task document.
 * @param {String} householdId - The id of the household this task belongs to.
 * @param {String} taskId - The task's id.
 */
module.exports.deleteTask = async (householdId, taskId) => {
    let updatedHousehold = await HouseholdModel.findOneAndUpdate(
        { _id: householdId, 'tasks._id': taskId },
        { $pull: { tasks: { _id: taskId } } },
        { new: true }
    ).exec();

    if(!updatedHousehold) {
        throw new Error(`The household ${ householdId } does not have a task with the id ${ taskId }`);
    }
    
    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

// --- Note Controller Logic

/**
 * Creates a new note document.
 * @param {String} householdId - The id of the household this note will belong to.
 * @param {String} creatorId - The id of the user creating this note.
 * @param {String} title - The note's title.
 * @param {String} [body] - The note's body.
 */
module.exports.createNote = async (householdId, creatorId, title, body = null) => {
    let note = {
        _creatorId: creatorId,
        title: title,
        createdAt: Date.now()
    };

    if(body) note.body = body;

    let updatedHousehold = await HouseholdModel.findOneAndUpdate(
        { _id: householdId },
        { $push: { notes: note } },
        { new: true }
    ).exec();

    if(!updatedHousehold) throw new Error(`No household was found that matched the query criteria.`);
 

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

/**
 * Retrieves a note document.
 * @param {String} householdId - The id of the household this note belongs to.
 * @param {String} noteId - The note's id.
 */
module.exports.readNote = async (householdId, noteId) => {
    const household = await HouseholdModel.findOne({ _id: householdId, 'notes._id': noteId }).exec();

    if(!household) { 
        throw new Error(`The household ${ householdId } does not have a note with the id ${ noteId }`);
    }

    const note = household.notes.id(noteId);

    if(!note) {
        throw new Error(`Error retrieving note ${ noteId } from household ${ householdId }`);
    }

    return note;
};

/**
 * Updates a note document.
 * @param {String} householdId - The id of the household this note belongs to.
 * @param {String} noteId - The note's _id.
 * @param {String} [title] - The note's new title.
 * @param {String} [body] - The note's new body.
 */
module.exports.updateNote = async (householdId, noteId, title = null, body = null) => {
    if(!title && !body) {
        throw new Error(`No values were passed to update the note with id ${ noteId }`);
    }
    
    let update = {};    

    if(title) update['notes.$.title'] = title;
    if(body) update['notes.$.body'] = body;
    update['notes.$.updatedAt'] = Date.now();

    let updatedHousehold = await HouseholdModel.findOneAndUpdate(
        { _id: householdId, 'notes._id': noteId },
        update,
        { new: true }
    ).exec();

    if(!updatedHousehold) {
        throw new Error(`The household ${ householdId } does not have a note with the id ${ noteId }`);
    }

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

/**
 * Deletes a note document.
 * @param {String} householdId - The id of the household this note belongs to.
 * @param {String} userId - The id of the user requesting this note deletion.
 * @param {String} noteId - The note's id.
 */
module.exports.deleteNote = async (householdId, userId, noteId) => {
    let updatedHousehold = await HouseholdModel.findOneAndUpdate(
        { _id: householdId, _memberIds: userId, 'notes._id': noteId },
        { $pull: { notes: { _id: noteId, _creatorId: userId } } },
        { new: true }
    ).exec();

    if(!updatedHousehold) {
        throw new Error(`The household ${ householdId } does not have a note with the id ${ noteId }`);
    }

    updatedHousehold = {
        ...updatedHousehold._doc,
        members: await getHouseholdMembers(updatedHousehold._id)
    };

    return updatedHousehold;
};

// HELPER METHODS

/**
 * Gets the member user documents of a household with personal data removed.
 * @param {String} householdId
 */
const getHouseholdMembers = async householdId => {
    const members = await UserModel.find({ _householdIds: householdId }, nonPersonalUserData).exec();

    return members;
};

const getHouseholdMembersLean = async householdId => {
    return await UserModel.find({ _householdIds: householdId }, nonPersonalUserData).lean().exec();
};