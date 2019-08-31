'use strict';

// --- Modules
const mongoose = require('mongoose');
const crypto = require('crypto');

const HouseholdController = require('../../src/household/household.controller');
const HouseholdModel = require('../../src/household/household.model');
const UserModel = require('../../src/user/user.model');

process.env.TEST_SUITE = 'familypanel-household-controller-test';

/**
 * Generates an 8 character salt.
 */
const generateSalt = () => {
    return crypto.randomBytes(8).toString('hex').slice(0, 8);
}

/**
 * Hashes a password with the passed salt.
 * @param {String} password 
 * @param {String} salt 
 */
const generateHash = (password, salt) => {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    hash = hash.digest('hex');

    return hash;
};


describe('Household Controller', () => {
    describe('Household', () => {
        describe('createHousehold()', () => {
            test('Can create a household', async () => {
                const salt = generateSalt();
                const hashedPassword = generateHash('testpassword', salt);

                const user = await new UserModel({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'jdoe@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();

                const household = await HouseholdController.createHousehold(user._id, [user._id,], 'Our Apartment');

                expect(household.name).toBe('Our Apartment');
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
                    const salt = generateSalt();
                    const hashedPassword = generateHash('testpassword', salt);

                    const owner = await new UserModel({
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'jdoe@test.com',
                        password: hashedPassword,
                        salt: salt
                    }).save();

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
                const userId = new mongoose.Types.ObjectId();

                let household = await new HouseholdModel({
                    _ownerId: userId,
                    _memberIds: [userId],
                    name: 'Our Apartment'
                }).save();

                household = await HouseholdController.readHousehold(household._id);

                expect(household.name).toBe('Our Apartment');
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
                const userId = new mongoose.Types.ObjectId();

                let household = await new HouseholdModel({
                    _ownerId: userId,
                    _memberIds: [userId],
                    name: 'Our Apartment'
                }).save();

                household = await HouseholdController.updateHousehold(household._id, null, null, 'Our Condo');

                expect(household.name).toBe('Our Condo');
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
                const userId = new mongoose.Types.ObjectId();

                let household = await new HouseholdModel({
                    _ownerId: userId,
                    _memberIds: [userId],
                    name: 'Our Apartment'
                }).save();

                household = await HouseholdController.deleteHousehold(household._id);

                expect(household.name).toBe('Our Apartment');
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
                const salt = generateSalt();
                const hashedPassword = generateHash('testpassword', salt);

                let user = await new UserModel({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'jdoe@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();

                const household = await new HouseholdModel({
                    _ownerId: user._id,
                    _memberIds: [user._id],
                    name: 'Our Apartment'
                }).save();

                await UserModel.findByIdAndUpdate(user._id, { $push: { _householdIds: household._id } }).exec();

                await HouseholdController.deleteHousehold(household._id);

                user = await UserModel.findById(user._id).exec();

                expect(user._householdIds.length).toBe(0);
            });

            test('Removes household id from a member\'s _householdIds', async () => {
                const salt = generateSalt();
                const hashedPassword = generateHash('testpassword', salt);

                let member = await new UserModel({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'jdoe@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();

                const owner = await new UserModel({
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jdoe1@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();

                const household = await new HouseholdModel({
                    _ownerId: owner._id,
                    _memberIds: [owner._id, member._id],
                    name: 'Our Apartment'
                }).save(); 

                await UserModel.findByIdAndUpdate(member._id, { $push: { _householdIds: household._id } });
                await UserModel.findByIdAndUpdate(owner._id, { $push: { _householdIds: household._id } });

                await HouseholdController.deleteHousehold(household._id);

                member = await UserModel.findById(member._id).exec();

                expect(member._householdIds.length).toBe(0);
            });
        });
    });

    describe('Events', () => {
        describe('createEvent()', () => {
            test('Can create an event', async () => {
                const salt = generateSalt();
                const hashedPassword = generateHash('testpassword', salt);

                const user = await new UserModel({
                    firstName: 'Adam',
                    lastName: 'Smith',
                    email: 'asmith@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();

                const household = await new HouseholdModel({
                    _ownerId: user._id,
                    _memberIds: [user._id,],
                    name: 'Our Apartment'
                }).save();

                await UserModel.findByIdAndUpdate(user._id, { $push: { _householdIds: household._id } }).exec();

                const event = await HouseholdController.createEvent(
                    household._id,
                    user._id,
                    'My Event'
                );

                expect(event.title).toBe('My Event');
            });

            test('Throws an error if the user does not exist', async () => {
                const mockUserId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    const household = await new HouseholdModel({
                        _ownerId: mockUserId,
                        _memberIds: [mockUserId,],
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
                    const user = await new UserModel({
                        firstName: 'Adam',
                        lastName: 'Smith',
                        email: 'asmith@test.com',
                        password: hashedPassword,
                        salt: salt,
                        _householdIds: [mockHouseholdId, ]
                    }).save();

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
                const salt = generateSalt();
                const hashedPassword = generateHash('testpassword', salt);
    
                const user = await new UserModel({
                    firstName: 'Adam',
                    lastName: 'Smith',
                    email: 'asmith@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();
    
                const household = await new HouseholdModel({
                    _ownerId: user._id,
                    _memberIds: [user._id,],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: user._id,
                        title: 'My Event',
                        time: Date.now()
                    }]
                }).save();
    
                const event = await HouseholdController.readEvent(household.events[0]._id);
    
                expect(event.title).toBe('My Event');
            });

            test('Throws an error if the event does not exist', async () => {
                const mockEventId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    await HouseholdController.readEvent(mockEventId);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            });
        });

        describe('updateEvent()', () => {
            test('Can update an event', async () => {
                const mockUserId = new mongoose.Types.ObjectId();
                let household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId,],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: mockUserId,
                        title: 'My Event',
                        time: Date.now()
                    }]
                }).save();

                await HouseholdController.updateEvent(
                    household._id,
                    household.events[0]._id,
                    'Bar Crawl',
                );

                household = await HouseholdModel.findById(household._id).exec();

                expect(household.events[0].title).toBe('Bar Crawl');
            });

            test('Returns the updated event', async () => {
                const mockUserId = new mongoose.Types.ObjectId();
                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId,],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: mockUserId,
                        title: 'My Event',
                        time: Date.now()
                    }]
                }).save();

                const event = await HouseholdController.updateEvent(
                    household._id,
                    household.events[0]._id,
                    'Bar Crawl',
                );

                expect(event.title).toBe('Bar Crawl');
            });

            test('Throws an error if no update data is passed', async () => {
                let error = null;

                const mockUserId = new mongoose.Types.ObjectId();
                const household = await new HouseholdModel({
                    _ownerId: mockUserId,
                    _memberIds: [mockUserId,],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: mockUserId,
                        title: 'My Event',
                        time: Date.now()
                    }]
                }).save();

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
                const salt = generateSalt();
                const hashedPassword = generateHash('testpassword', salt);

                const user = await new UserModel({
                    firstName: 'Adam',
                    lastName: 'Smith',
                    email: 'asmith@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();

                let household = await new HouseholdModel({
                    _ownerId: user._id,
                    _memberIds: [user._id,],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: user._id,
                        title: 'My Event',
                        time: Date.now()
                    }]
                }).save();

                await HouseholdController.deleteEvent(household.events[0]._id);

                household = await HouseholdModel.findById(household._id);

                expect(household.events.length).toBe(0);
            });

            test('Returns the correct event', async () => {
                const salt = generateSalt();
                const hashedPassword = generateHash('testpassword', salt);

                const user = await new UserModel({
                    firstName: 'Adam',
                    lastName: 'Smith',
                    email: 'asmith@test.com',
                    password: hashedPassword,
                    salt: salt
                }).save();

                const household = await new HouseholdModel({
                    _ownerId: user._id,
                    _memberIds: [user._id,],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: user._id,
                        title: 'My Event',
                        time: Date.now()
                    }]
                }).save();

                const event = await HouseholdController.deleteEvent(household.events[0]._id);

                expect(event.title).toBe('My Event');
            });

            test('Throws an error if the event does not exist', async () => {
                const mockEventId = new mongoose.Types.ObjectId();
                let error = null;

                try {
                    await HouseholdController.deleteEvent(mockEventId);
                } catch (err) {
                    error = err;
                }

                expect(error).not.toBeNull();
            }); 
        });
    });

    describe('Tasks', () => {
        describe('createTask()', () => {

        });

        describe('readTask()', () => {

        });

        describe('updateTask()', () => {

        });

        describe('deleteTask()', () => {

        });
    });

    describe('Notes', () => {
        describe('createNote()', () => {

        });

        describe('readNote()', () => {

        });

        describe('updateNote()', () => {

        });

        describe('deleteNote()', () => {

        });
    });
});