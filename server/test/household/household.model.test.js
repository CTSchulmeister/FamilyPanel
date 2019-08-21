'use strict';

// --- Modules
const mongoose = require('mongoose');

const HouseholdModel = require('../../src/household/household.model');

describe('Household Model', () => {
    const idOne = new mongoose.Types.ObjectId;
    const idTwo = new mongoose.Types.ObjectId;
    const idThree = new mongoose.Types.ObjectId;

    describe('CREATE', () => {
        test('Can create a household', async () => {
            await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            const household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            expect(household.name).toEqual('Our Apartment');
        });

        test('Does not create a household if missing data', async () => {
            const household = new HouseholdModel({
                name: 'Our Apartment'
            });
    
            household.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });

        test('Can create an event', async () => {
            await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            let household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            household.events.push({
                _creatorId: idOne,
                title: 'Concert',
                description: 'At the House of Blues',
                time: '2019-10-09'
            });

            await household.save();

            household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            expect(household.events[0].title).toEqual('Concert');
        });

        test('Can create a note', async () => {
            await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            let household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            household.notes.push({
                _creatorId: idTwo,
                title: 'Hey, guys...',
                body: 'Remember to be washing your dishes after you use them.'
            });

            await household.save();

            household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            expect(household.notes[0].title).toEqual('Hey, guys...');
        });

        test('Can create a task', async () => {
            await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            let household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            household.tasks.push({
                _creatorId: idTwo,
                _assignedUserIds: [idOne, idTwo, idThree],
                title: 'Take out the trash'
            });

            await household.save();

            household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            expect(household.tasks[0]._assignedUserIds.length).toBe(3);
        });

        test('Can create a task without assigned users', async () => {
            await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            let household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            household.tasks.push({
                _creatorId: idTwo,
                title: 'Take out the trash'
            });

            await household.save();

            household = await HouseholdModel.findOne({ name: 'Our Apartment' });

            expect(household.tasks[0]._assignedUserIds.length).toEqual(3);
        });
    });

    describe('READ', () => {
        test('Doesn\'t find a household if that household doesn\'t exist', async () => {
            const household = await HouseholdModel.findOne({ name: 'Our Apartment' }).exec();

            expect(household).toBeNull();
        });
    });

    describe('UPDATE', () => {
        test('Can update a household', async () => {
            await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            const household = await HouseholdModel.findOneAndUpdate(
                { name: 'Our Apartment' },
                { name: 'Our Condo' },
                { new: true }).exec();

            expect(household.name).toEqual('Our Condo');
        });
    });

    describe('DELETE', () => {
        test('Can delete a household', async () => {
            await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            const household = await HouseholdModel.findOneAndDelete({ name: 'Our Apartment' }).exec();

            expect(household.name).toEqual('Our Apartment');
        });
    });
});