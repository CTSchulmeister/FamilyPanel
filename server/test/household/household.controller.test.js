'use strict';

// --- Modules
const mongoose = require('mongoose');
const { generateSalt, generateHash } = require('../../src/util');
const { 
    randomStringGenerator, 
    userFactory, 
    householdFactory, 
    householdWithEventsFactory,
    householdWithTasksFactory,
    householdWithNotesFactory
} = require('../testUtilties');

const HouseholdController = require('../../src/household/household.controller');
const HouseholdModel = require('../../src/household/household.model');
const UserModel = require('../../src/user/user.model');

process.env.TEST_SUITE = 'familypanel-household-controller-test';
process.env.JWT_KEY = 'testkey';

// Utilities and Mock Factories

describe('Household Controller', () => {
    describe('Household', () => {
        describe('createHousehold()', () => {
            test('Can create a household', async () => {
                const user = await userFactory();
                const { newHousehold } = await HouseholdController.createHousehold(user._id, [user._id], 'Our Apartment');
                expect(newHousehold.name).toStrictEqual('Our Apartment');
            });

            test('Adds the new household to the user\'s _householdIds', async () => {
                const user = await userFactory();
                const { newHousehold, updatedUser } = await HouseholdController.createHousehold(user._id, [user._id], randomStringGenerator(15));
                expect(updatedUser._householdIds[0]).toStrictEqual(newHousehold._id);
            });

            test('Returns the new household in the user\'s list of households', async () => {
                const user = await userFactory();
                const { newHousehold, households } = await HouseholdController.createHousehold(user._id, [user._id], randomStringGenerator(15));
                expect(households[0]._id).toStrictEqual(newHousehold._id);
            });

            test('Returns the household with members', async () => {
                const user = await userFactory();
                const { newHousehold } = await HouseholdController.createHousehold(user._id, [user._id], 'Our Apartment');
                expect(newHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if creating a household with missing data', async () => {
                let error = null;

                try {
                    await HouseholdController.createHousehold(new mongoose.Types.ObjectId());
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Throws an error if the owner does not exist', async () => {
                let error = null;

                try {
                    const userId = new mongoose.Types.ObjectId();
                    await HouseholdController.createHousehold(userId, [userId], 'Our Apartment');
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Throws an error if a member does not exist', async () => {
                let error = null;

                try {
                    const owner = await userFactory();
                    const mockMemberId = new mongoose.Types.ObjectId();
                    await HouseholdController.createHousehold(owner._id, [owner._id, mockMemberId], 'Our Apartment');
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('readHousehold()', () => {
            test('Can retrieve a household', async () => {
                const household = await householdFactory();
                const retrievedHousehold = await HouseholdController.readHousehold(household._id);
                expect(retrievedHousehold.name).toStrictEqual(household.name);
            });

            test('Returns the household with members', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const retrievedHousehold = await HouseholdController.readHousehold(household._id);

                expect(retrievedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if retrieving a non-existant user', async () => {
                let error = null;

                try {
                    await HouseholdController.readHousehold(new mongoose.Types.ObjectId());
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Handles invalid data input', async () => {
                let error = null;

                try {
                    await HouseholdController.readHousehold('Test');
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('updateHousehold()', () => {
            test('Can update a household', async () => {
                const household = await householdFactory();
                const updatedHousehold = await HouseholdController.updateHousehold(household._id, null, null, 'Our Condo');
                expect(updatedHousehold.name).toStrictEqual('Our Condo');
            });

            test('Returns the household with members', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const updatedHousehold = await HouseholdController.updateHousehold(household._id, null, null, 'Our Condo');

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if the household does not exist', async () => {
                let error = null;

                const update = {
                    name: 'Our Condo'
                };

                try {
                    await HouseholdController.updateHousehold(new mongoose.Types.ObjectId(), update);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('deleteHousehold()', () => {
            test('Can delete a household', async () => {
                const household = await householdFactory();
                await HouseholdController.deleteHousehold(household._id);
                const queryResult = await HouseholdModel.findById(household._id).exec();
                expect(queryResult).toBeNull();
            });

            test('Returns the deleted household', async () => {
                const household = await householdFactory();
                const deletedHousehold = await HouseholdController.deleteHousehold(household._id);
                expect(deletedHousehold.name).toStrictEqual(household.name);
            });

            test('Throws an error if the household does not exist', async () => {
                let error = null;

                try {
                    await HouseholdController.deleteHousehold(new mongoose.Types.ObjectId());
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Handles invalid data input', async () => {
                let error = null;
                
                try {
                    await HouseholdController.deleteHousehold('test');
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Removes household id from the owner\'s _householdIds', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                await HouseholdController.deleteHousehold(household._id);

                const updatedUser = await UserModel.findById(user._id).exec();
                
                expect(updatedUser._householdIds.length).toStrictEqual(0);
            });

            test('Removes household id from a member\'s _householdIds', async () => {
                const member = await userFactory();
                const owner = await userFactory();
                const household = await householdFactory(owner, member);
                
                await HouseholdController.deleteHousehold(household._id);

                const updatedMember = await UserModel.findById(member._id).exec();

                expect(updatedMember._householdIds.length).toStrictEqual(0);
            });
        });
    });

    describe('Events', () => {
        describe('createEvent()', () => {
            test('Can create an event', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const householdWithEvent = await HouseholdController.createEvent(
                    household._id,
                    user._id,
                    randomStringGenerator()
                );

                expect(householdWithEvent.events.length).toStrictEqual(1);
            });

            test('Returns the updated household', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const householdWithEvent = await HouseholdController.createEvent(
                    household._id,
                    user._id,
                    randomStringGenerator()
                );

                expect(householdWithEvent.name).toStrictEqual(household.name);
            });

            test('Returns the updated household with members', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const householdWithEvent = await HouseholdController.createEvent(
                    household._id,
                    user._id,
                    randomStringGenerator()
                );

                expect(householdWithEvent.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if the user does not exist', async () => {
                const mockUserId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    const household = await new HouseholdModel({
                        _ownerId: mockUserId,
                        _memberIds: [mockUserId, ],
                        name: 'Our Apartment'
                    }).save();

                    await HouseholdController.createEvent(
                        household._id,
                        mockUserId,
                        'My Event'
                    );
                } catch (err) {
                    if(err) error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Throws an error if the household does not exist', async () => {
                const mockHouseholdId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    const user = await userFactory();
                    await UserModel.findByIdAndUpdate(user._id, {
                        $push: { _householdIds: mockHouseholdId }
                    }).exec();

                    await HouseholdController.createEvent(
                        mockHouseholdId,
                        user._id,
                        'My Event'
                    );
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('readEvent()', () => {
            test('Can retrieve an event document', async () => {
                const user = await userFactory();
                const household = await householdWithEventsFactory(user);
    
                const event = await HouseholdController.readEvent(household._id, household.events[0]._id);
    
                expect(event.title).toStrictEqual(household.events[0].title);
            });

            test('Throws an error if the event does not exist', async () => {
                const mockEventId = new mongoose.Types.ObjectId();
                const mockUserId = new mongoose.Types.ObjectId();
                let error = null;

                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId, ],
                    name: 'Our Apartment'
                }).save();

                try {
                    await HouseholdController.readEvent(household._id, mockEventId);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('updateEvent()', () => {
            test('Can update an event', async () => {
                const user = await userFactory();
                const household = await householdWithEventsFactory(user);

                const updatedHousehold = await HouseholdController.updateEvent(
                    household._id,
                    household.events[0]._id,
                    'Bar Crawl',
                );

                expect(updatedHousehold.events[0].title).toStrictEqual('Bar Crawl');
            });

            test('Returns the updated household with members', async () => {
                const user = await userFactory();
                const household = await householdWithEventsFactory(user);

                const updatedHousehold = await HouseholdController.updateEvent(
                    household._id,
                    household.events[0]._id,
                    'Bar Crawl',
                );

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if no update data is passed', async () => {
                let error = null;

                const user = await userFactory();
                const household = await householdWithEventsFactory(user);

                try {
                    await HouseholdController.updateEvent(household._id, household.events[0]._id);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('deleteEvent()', () => {
            test('Can delete an event', async () => {
                const user = await userFactory();
                const household = await householdWithEventsFactory(user);

                const updatedHousehold = await HouseholdController.deleteEvent(household._id, household.events[0]._id);

                expect(updatedHousehold.events.length).toStrictEqual(0);
            });

            test('Returns the updated household with members', async () => {
                const user = await userFactory();
                const household = await householdWithEventsFactory(user);

                const updatedHousehold = await HouseholdController.deleteEvent(household._id, household.events[0]._id);

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if the event does not exist', async () => {
                const mockUserId = new mongoose.Types.ObjectId();
                const mockEventId = new mongoose.Types.ObjectId();
                let error = null;

                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId, ],
                    name: 'Our Apartment'
                }).save();

                try {
                    await HouseholdController.deleteEvent(household._id, mockEventId);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            }); 
        });
    });

    describe('Tasks', () => {
        describe('createTask()', () => {
            test('Can create a task', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const updatedHousehold = await HouseholdController.createTask(
                    household._id,
                    user._id,
                    'My Task'
                );

                expect(updatedHousehold.tasks.length).toStrictEqual(1);
            });

            test('Assigns all household members to a task if no specific assigned users are passed', async () => {
                const creator = await userFactory();
                const member = await userFactory();
                const household = await householdFactory(creator, member);

                const updatedHousehold = await HouseholdController.createTask(
                    household._id, 
                    creator._id, 
                    'My Task'
                );

                expect(updatedHousehold.tasks[0]._assignedUserIds.length).toStrictEqual(2);
            });

            test('Returns the household with members', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const updatedHousehold = await HouseholdController.createTask(
                    household._id,
                    user._id,
                    'My Task'
                );

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if the creator does not exist', async () => {
                const mockCreatorId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    const household = await new HouseholdModel({
                        _ownerId: mockCreatorId,
                        _memberIds: [mockCreatorId, ],
                        name: 'Our Apartment'
                    }).save();

                    await HouseholdController.createTask(
                        household._id,
                        mockCreatorId,
                        'My Task'
                    );
                } catch (err) {
                    if(err) error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Throws an error if the household does not exist', async () => {
                const mockHouseholdId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    const user = await new UserModel({
                        firstName: 'Adam',
                        lastName: 'Smith',
                        email: 'asmith@test.com',
                        password: hashedPassword,
                        salt: salt,
                        _householdIds: [mockHouseholdId, ]
                    }).save();

                    await HouseholdController.createTask(
                        mockHouseholdId,
                        user._id,
                        'My Task'
                    );
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('readTask()', () => {
            test('Can retrieve a task document', async () => {
                const user = await userFactory();
                const household = await householdWithTasksFactory(user);
    
                const task = await HouseholdController.readTask(household._id, household.tasks[0]._id);
    
                expect(task.title).toStrictEqual(household.tasks[0].title);
            });

            test('Throws an error if the task does not exist', async () => {
                const mockTaskId = new mongoose.Types.ObjectId();
                const mockUserId = new mongoose.Types.ObjectId();
                let error = null;

                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId, ],
                    name: 'Our Apartment'
                }).save();

                try {
                    await HouseholdController.readTask(household._id, mockTaskId);
                } catch (err) {
                    error = err;
                } 

                expect(error).not.toBeNull();
            });
        });

        describe('updateTask()', () => {
            test('Can update a task', async () => {
                const user = await userFactory();
                const household = await householdWithTasksFactory(user);

                const updatedHousehold = await HouseholdController.updateTask(
                    household._id,
                    household.tasks[0]._id,
                    null,
                    'Do the Dishes!',
                );

                expect(updatedHousehold.tasks[0].title).toStrictEqual('Do the Dishes!');
            });

            test('The updated household contains the members of the household', async () => {
                const user = await userFactory();
                const household = await householdWithTasksFactory(user);

                const updatedHousehold = await HouseholdController.updateTask(
                    household._id,
                    household.tasks[0]._id,
                    null,
                    'Do the Dishes!',
                );

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if no update data is passed', async () => {
                let error = null;

                const user = await userFactory();
                const household = await householdWithTasksFactory(user);

                try {
                    await HouseholdController.updateTask(household._id, household.tasks[0]._id);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });

            test('Throws an error if an assignedUser does not belong to the household', async () => {
                const member = await userFactory();
                const nonMember = await userFactory();
                const household = await householdWithTasksFactory(member);

                let error = null;

                try {
                    await HouseholdController.updateTask(
                        household._id,
                        household.tasks[0]._id,
                        [member._id, nonMember._id]
                    );
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('deleteTask()', () => {
            test('Can delete a task', async () => {
                const user = await userFactory();
                const household = await householdWithTasksFactory(user);

                const updatedHousehold = await HouseholdController.deleteTask(household._id, household.tasks[0]._id);

                expect(updatedHousehold.tasks.length).toStrictEqual(0);
            });

            test('The updated household contains the members of the household', async () => {
                const user = await userFactory();
                const household = await householdWithTasksFactory(user);

                const updatedHousehold = await HouseholdController.deleteTask(household._id, household.tasks[0]._id);

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if the task does not exist', async () => {
                const mockUserId = new mongoose.Types.ObjectId();
                const mockTaskId = new mongoose.Types.ObjectId();
                let error = null;

                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId, ],
                    name: 'Our Apartment'
                }).save();

                try {
                    await HouseholdController.deleteTask(household._id, mockTaskId);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });
    });

    describe('Notes', () => {
        describe('createNote()', () => {
            test('Can create a note', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const updatedHousehold = await HouseholdController.createNote(
                    household._id,
                    user._id,
                    'My Note',
                );

                expect(updatedHousehold.notes.length).toStrictEqual(1);
            });

            test('Returns the household with members', async () => {
                const user = await userFactory();
                const household = await householdFactory(user);

                const updatedHousehold = await HouseholdController.createNote(
                    household._id,
                    user._id,
                    'My Note',
                );

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if the household does not exist', async () => {
                const mockHouseholdId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    const user = await new UserModel({
                        firstName: 'Adam',
                        lastName: 'Smith',
                        email: 'asmith@test.com',
                        password: hashedPassword,
                        salt: salt,
                        _householdIds: [mockHouseholdId, ]
                    }).save();

                    await HouseholdController.createNote(
                        mockHouseholdId,
                        user._id,
                        'My Note'
                    );
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('readNote()', () => {
            test('Can retrieve a note document', async () => {
                const user = await userFactory();
                const household = await householdWithNotesFactory(user);
    
                const note = await HouseholdController.readNote(household._id, household.notes[0]._id);
    
                expect(note.title).toStrictEqual(household.notes[0].title);
            });

            test('Throws an error if the note does not exist', async () => {
                const mockNoteId = new mongoose.Types.ObjectId();
                const mockUserId = new mongoose.Types.ObjectId();
                let error = null;

                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId, ],
                    name: 'Our Apartment'
                }).save();

                try {
                    await HouseholdController.readNote(household._id, mockNoteId);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('updateNote()', () => {
            test('Can update a note', async () => {
                const user = await userFactory();
                const household = await householdWithNotesFactory(user);

                const updatedHousehold = await HouseholdController.updateNote(
                    household._id,
                    household.notes[0]._id,
                    'I Wrote a Note!'
                );

                expect(updatedHousehold.notes[0].title).toStrictEqual('I Wrote a Note!');
            });

            test('Returns the household with members', async () => {
                const user = await userFactory();
                const household = await householdWithNotesFactory(user);

                const updatedHousehold = await HouseholdController.updateNote(
                    household._id,
                    household.notes[0]._id,
                    'I Wrote a Note!'
                );

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if no update data is passed', async () => {
                let error = null;

                const user = await userFactory();
                const household = await householdWithNotesFactory(user);

                try {
                    await HouseholdController.updateNote(household._id, household.notes[0]._id);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('deleteNote()', () => {
            test('Can delete a note', async () => {
                const user = await userFactory();
                const household = await householdWithNotesFactory(user);

                const updatedHousehold = await HouseholdController.deleteNote(household._id, user._id, household.notes[0]._id);

                expect(updatedHousehold.notes.length).toStrictEqual(0);
            });

            test('Returns the household with members', async () => {
                const user = await userFactory();
                const household = await householdWithNotesFactory(user);

                const updatedHousehold = await HouseholdController.deleteNote(household._id, user._id, household.notes[0]._id);

                expect(updatedHousehold.members[0]._id).toStrictEqual(user._id);
            });

            test('Throws an error if the note does not exist', async () => {
                const mockUserId = new mongoose.Types.ObjectId();
                const mockNoteId = new mongoose.Types.ObjectId();
                let error = null;

                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId, ],
                    name: 'Our Apartment'
                }).save();

                try {
                    await HouseholdController.deleteNote(household._id, mockNoteId);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            }); 
        });
    });
});