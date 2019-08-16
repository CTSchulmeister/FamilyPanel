"use strict";

// --- Modules
const mongoose = require('mongoose');

const HouseholdModel = require('../../src/household/household.model');

describe('Household Model', () => {
    describe('CREATE', () => {
        test('Can create a household', async () => {
            await new HouseholdModel({
                _ownerId: 1,
                _memberIds: [1, 2, 3],
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
                _ownerId: 1,
                _memberIds: [1, 2, 3],
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
                _ownerId: 1,
                _memberIds: [1, 2, 3],
                name: 'Our Apartment'
            }).save();

            const household = await HouseholdModel.findOneAndDelete({ name: 'Our Apartment' }).exec();

            expect(household.name).toEqual('Our Apartment');
        });
    });
});

describe('Household Routes', () => {

});