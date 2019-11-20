'use strict';

// --- Modules
const mongoose = require('mongoose');

const UserController = require('../../src/user/user.controller');
const UserModel = require('../../src/user/user.model');
const HouseholdModel = require('../../src/household/household.model');

const {
    userFactory,
    householdFactory
} = require('../testUtilties');

process.env.TEST_SUITE = 'familypanel-user-controller-test';
process.env.JWT_KEY = 'testkey';

describe('User Controller', () => {
    describe('createUser()', () => {
        test('Can create a user', async () => {
            const { user } = await UserController.createUser('A', 'Test', 'atest@email.com', 'mypassword');

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

        test('Creates a token', async () => {
            const { user } = await UserController.createUser('John', 'Smith', 'jsmith@gmail.com', 'test123!');

            expect(user.tokens.length).toBe(1);
        });
    });

    describe('readUser()', () => {
        test('Can retrieve a user', async () => {
            const user = await userFactory();
            const result = await UserController.readUser(user._id);
            expect(result._id).toStrictEqual(user._id);
        });

        test('Can handle string arguments in place of objectIds', async () => {
            const user = await userFactory();
            const result = await UserController.readUser(String(user._id));
            expect(result._id).toStrictEqual(user._id);
        });

        test('Throws an error if retrieving a non-existant user', async () => {
            let error = null;

            try {
                await UserController.readUser(new mongoose.Types.ObjectId());
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });
    });

    describe('updateUser()', () => {
        test('Can update a user', async () => {
            const user = await userFactory();
            const result = await UserController.updateUser(
                user._id,
                'Bob',
            );
            expect(result.firstName).toStrictEqual('Bob');
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
            const user = await userFactory();
            await UserController.deleteUser(user._id);
            const queryResult = await UserModel.findById(user).lean().exec();
            expect(queryResult).toBeNull();
        });
    })

    test('Can delete a user and their owned household', async () => {
        const user = await userFactory();
        const household = await householdFactory(user);

        await UserController.deleteUser(user._id);
        const queryResult = await HouseholdModel.findById(household._id);

        expect(queryResult).toBeNull();
    });

    test('Can delete a user and their relevant documents from a household they do not own', async () => {
        const user = await userFactory();
        const householdOwner = await userFactory();
        const household = await householdFactory(householdOwner, user);

        const note = {
            _creatorId: user._id,
            title: 'My Note',
            body: 'Blah blah blah'
        };

        const userTask = {
            _creatorId: user._id,
            _assignedUserId: [user._id, householdOwner._id],
            title: 'My Task'
        };

        const ownerTask = {
            _creatorId: householdOwner._id,
            _assignedUserId: [user._id, householdOwner._id],
            title: 'Owner Task'
        };

        await HouseholdModel.findByIdAndUpdate(household._id, {
            $push: { notes: note, tasks: [userTask, ownerTask] }
        }).lean().exec();

        await UserController.deleteUser(user._id);

        const queryResult = await HouseholdModel.findById(household._id);

        expect(Object.values(queryResult._memberIds).indexOf(user._id)).toStrictEqual(-1);
        expect(queryResult.notes.length).toStrictEqual(0);
        expect(queryResult.tasks.length).toStrictEqual(1);
        expect(Object.values(queryResult.tasks[0]._assignedUserIds).indexOf(user._id)).toStrictEqual(-1);
    });
})