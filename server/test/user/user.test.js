"use strict";

// --- Modules
const mongoose = require('mongoose');
const crypto = require('crypto');

const UserModel = require('../../src/user/user.model');

describe('User Model', () => {
    describe('CREATE', () => {
        test('Can create a user', async () => {
            await new UserModel({
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@test.com',
                password: 'testpassword'
            }).save();
    
            const user = await UserModel.findOne({ firstName: 'John' }).exec();
    
            expect(user.firstName).toEqual('John');
        });
    
        test('Can hash a password', async () => {
            await new UserModel({
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@test.com',
                password: 'testpassword'
            }).save();
    
            const user = await UserModel.findOne({ firstName: 'John' }).exec();
    
            let hash = crypto.createHmac('sha256', user.salt);
            hash.update('testpassword');
            hash = hash.digest('hex');
    
            expect(user.password).toEqual(hash);
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
            const user = await UserModel.findOne({ firstName: 'John' }).exec();
    
            expect(user).toBeNull();
        });
    });
    
    describe('UPDATE', () => {
        test('Can update a user', async () => {
            await new UserModel({
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@test.com',
                password: 'testpassword'
            }).save();
    
            const user = await UserModel.findOneAndUpdate(
                { firstName: 'John' }, 
                { firstName: 'Martin' },
                { new: true }).exec();
            
            expect(user.firstName).toEqual('Martin');
        });
    });
    
    describe('DELETE', () => {
        test('Can delete a user', async () => {
            await new UserModel({
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@test.com',
                password: 'testpassword'
            }).save();
    
            const user = await UserModel.findOneAndDelete({ firstName: 'John' }).exec();
    
            expect(user.firstName).toEqual('John');
        });
    });
});

describe('User Routes', () => {

});

