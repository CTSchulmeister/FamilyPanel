'use strict';

// --- Modules
const mongoose = require('mongoose');

const UserController = require('../../src/user/user.controller');
const HouseholdModel = require('../../src/household/household.model');

process.env.TEST_SUITE = 'familypanel-user-controller-test';

describe('User Controller', () => {
    describe('createUser()', () => {
        test('Can create a user', async () => {
            const user = await UserController.createUser('A', 'Test', 'atest@email.com', 'mypassword');

            expect(user.firstName).toBe('A');
        });

        test('Throws an error if creating a user with missing data', async () => {
            let error = null;
            
            try {
                await UserController.createUser('John');
            } catch (err) {
                error = err;
            }

            expect(error).not.toBeNull();
        });
    });

    describe('readUser()', () => {
        test('Can retrieve a user', async () => {
            let user = await UserController.createUser('B', 'Test', 'btest@email.com', 'mypassword');

            user = await UserController.readUser(user._id);

            expect(user.firstName).toBe('B');
        });

        test('Throws an error if retrieving a non-existant user', async () => {
            let error = null;

            try {
                await UserController.readUser(new mongoose.Types.ObjectId());
            } catch (err) {
                error = err;
            }

            expect(error).not.toBeNull();
        });
    });

    describe('updateUser()', () => {
        test('Can update a user', async () => {
            let user = await UserController.createUser('C', 'Test', 'ctest@email.com', 'mypassword');

            user = await UserController.updateUser(user._id, 'Bob', null, null, null);

            expect(user.firstName).toBe('Bob');
        });

        test('Throws an error if the user does not exist', async () => {
            let error = null;

            const update = {
                firstName: 'Bob'
            };

            try {
                await UserController.updateUser(new mongoose.Types.ObjectId(), update);
            } catch (err) {
                error = err;
            }

            expect(error).not.toBeNull();
        });
    })

    describe('deleteUser()', () => {
        test('Can delete a user', async () => {
            let user = await UserController.createUser('D', 'Test', 'dtest@email.com', 'mypassword');

            user = await UserController.deleteUser(user._id);

            expect(user.firstName).toBe('D');
        });
    })

    test('Can delete a user and their owned household', async () => {
        let user = await UserController.createUser('E', 'Test', 'etest@email.com', 'mypassword');

        let household = await new HouseholdModel({
            _ownerId: user._id,
            _memberIds: [user._id],
            name: 'Test Household Two'
        });

        user = await UserController.deleteUser(user._id);
        household = await HouseholdModel.findById(household._id);

        expect(user.firstName).toBe('E');
        expect(household).toBeNull(); 
    });

    test('Can delete a user and their relevant documents from a not owner household', async () => {
        let user = await UserController.createUser('F', 'Test', 'ftest@email.com', 'mypassword');
        const mockUserId = new mongoose.Types.ObjectId();

        let household = await new HouseholdModel({
            _ownerId: mockUserId._id,
            _memberIds: [user._id, mockUserId],
            name: 'Test Household One',
            events: [{
                _creatorId: user._id,
                title: 'Concert',
            }],
            notes: [{
                _creatorId: user._id,
                title: 'My Note'
            }],
            tasks: [{
                _creatorId: user._id,
                _assignedUserIds: [user._id, mockUserId],
                title: 'First Task'
            }, {
                _creatorId: mockUserId,
                _assignedUserIds: [user._id, mockUserId],
                title: 'Second Task'
            }]
        }).save();

        user = await UserController.deleteUser(user._id);

        household = await HouseholdModel.findById(household._id);

        expect(user.firstName).toBe('F');
        expect(Object.values(household._memberIds).indexOf(user._id)).toBe(-1);
        expect(household.events.length).toBe(0);
        expect(household.notes.length).toBe(0);
        expect(household.tasks.length).toBe(1);
        expect(Object.values(household.tasks[0]._assignedUserIds).indexOf(user._id)).toBe(-1);
    });
})