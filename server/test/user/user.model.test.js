'use strict';

// --- Modules
const mongoose = require('mongoose');
const { generateSalt, generateHash } = require('../../src/util');

const UserModel = require('../../src/user/user.model');

process.env.TEST_SUITE = 'familypanel-user-model-test';
process.env.JWT_KEY = 'testkey';

describe('User Model', () => {
    describe('CREATE', () => {
        test('Can create a user', async () => {
            const salt = generateSalt();
            const hashedPassword = generateHash('testpassword', salt);

            let user = await new UserModel({
                firstName: 'G',
                lastName: 'Test',
                email: 'gtest@test.com',
                password: hashedPassword,
                salt: salt
            }).save();

            user = await UserModel.findById(user._id).exec();

            expect(user.firstName).toEqual('G');
        });
    
        test('Does not create a user if missing data', async () => {
            const user = new UserModel({
                firstName: 'John'
            });
    
            user.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });
    });
    
    describe('READ', () => {
        test('Doesn\'t find a user if that user doesn\'t exist', async () => {
            const user = await UserModel.findById(new mongoose.Types.ObjectId()).exec();
    
            expect(user).toBeNull();
        });
    });
    
    describe('UPDATE', () => {
        test('Can update a user', async () => {
            const salt = generateSalt();
            const hashedPassword = generateHash('testpassword', salt);

            let user = await new UserModel({
                firstName: 'I',
                lastName: 'Test',
                email: 'itest@test.com',
                password: hashedPassword,
                salt: salt
            }).save();
    
            user = await UserModel.findByIdAndUpdate(
                user._id, 
                { firstName: 'Martin' },
                { new: true }).exec();
            
            expect(user.firstName).toEqual('Martin');
        });
    });
    
    describe('DELETE', () => {
        test('Can delete a user', async () => {
            const salt = generateSalt();
            const hashedPassword = generateHash('testpassword', salt);

            let user = await new UserModel({
                firstName: 'J',
                lastName: 'Test',
                email: 'jtest@test.com',
                password: hashedPassword,
                salt: salt
            }).save();
    
            user = await UserModel.findByIdAndDelete(user._id).exec();
    
            expect(user.firstName).toEqual('J');
        });
    });
});