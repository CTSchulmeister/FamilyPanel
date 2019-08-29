'use strict';

// --- Modules
const mongoose = require('mongoose');

const HouseholdController = require('../../src/household/household.controller');

process.env.TEST_SUITE = 'familypanel-household-controller-test';

describe('Household Controller', () => {
    describe('Household', () => {
        describe('createHousehold()', () => {
            test('Can create a household', async () => {
                const userId = new mongoose.Types.ObjectId();

                const household = await HouseholdController.createHousehold(userId, [userId], 'Our Apartment');

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
        });

        describe('readHousehold()', () => {
            test('Can retrieve a household()', async () => {
                const userId = new mongoose.Types.ObjectId();

                let household = await HouseholdController.createHousehold(userId, [userId], 'Our Apartment');

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
        });

        describe('updateHousehold()', () => {
            test('Can update a household', async () => {
                const userId = new mongoose.Types.ObjectId();

                let household = await HouseholdController.createHousehold(userId, [userId], 'Our Apartment');

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

                let household = await HouseholdController.createHousehold(userId, [userId], 'Our Apartment');

                household = await HouseholdController.deleteHousehold(household._id);

                expect(household.name).toBe('Our Apartment');
            });
        });
    });

    describe('Events', () => {
        describe('createEvent()', () => {

        });

        describe('readEvent()', () => {

        });

        describe('updateEvent()', () => {

        });

        describe('deleteEvent()', () => {

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