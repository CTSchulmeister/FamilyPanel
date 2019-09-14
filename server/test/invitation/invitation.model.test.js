'use strict';

// --- Modules
const mongoose = require('mongoose');

const InvitationModel = require('../../src/invitation/invitation.model');

process.env.TEST_SUITE = 'familypanel-invitation-model-test';

describe('Invitation Model', () => {
    describe('CREATE', () => {
        test('Can create an invitation', async () => {
            let mockHousehold = new mongoose.Types.ObjectId();
            let mockSender = new mongoose.Types.ObjectId();
            let mockReciever = new mongoose.Types.ObjectId();

            const invitation = await new InvitationModel({
                _householdId: mockHousehold,
                _senderId: mockSender,
                _recieverId: mockReciever
            }).save();

            expect(invitation._householdId).toEqual(mockHousehold);
        });

        test('Does not create an invitation if missing householdId', async () => {
            let mockSender = new mongoose.Types.ObjectId();
            let mockReciever = new mongoose.Types.ObjectId();

            const invitation = await new InvitationModel({
                _senderId: mockSender,
                _recieverId: mockReciever
            });

            invitation.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });

        test('Does not create an invitation if missing senderId', async () => {
            let mockHousehold = new mongoose.Types.ObjectId();
            let mockReciever = new mongoose.Types.ObjectId();

            const invitation = await new InvitationModel({
                _householdId: mockHousehold,
                _recieverId: mockReciever
            });

            invitation.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });

        test('Does not create an invitation if missing recieverId', async () => {
            let mockSender = new mongoose.Types.ObjectId();
            let mockHousehold = new mongoose.Types.ObjectId();

            const invitation = await new InvitationModel({
                _senderId: mockSender,
                _householdId: mockHousehold
            });

            invitation.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });
    });

    describe('READ', () => {
        test('Can retrieve an invitation', async () => {
            let mockHousehold = new mongoose.Types.ObjectId();
            let mockSender = new mongoose.Types.ObjectId();
            let mockReciever = new mongoose.Types.ObjectId();

            let invitation = await new InvitationModel({
                _householdId: mockHousehold,
                _senderId: mockSender,
                _recieverId: mockReciever
            }).save();

            invitation = await InvitationModel.findById(invitation._id).exec();

            expect(invitation._householdId).toEqual(mockHousehold);
        });

        test('Doesn\'t find an invitation if that invitation doesn\'t exist', async () => {
            const invitation = await InvitationModel.findOne(new mongoose.Types.ObjectId()).exec();
            
            expect(invitation).toBeNull();
        });
    });

    describe('UPDATE', () => {
        test('Can update an invitation', async () => {
            let mockHousehold = new mongoose.Types.ObjectId();
            let mockSender = new mongoose.Types.ObjectId();
            let mockReciever = new mongoose.Types.ObjectId();

            let invitation = await new InvitationModel({
                _householdId: mockHousehold,
                _senderId: mockSender,
                _recieverId: mockReciever
            }).save();

            invitation = await InvitationModel.findByIdAndUpdate(
                invitation._id,
                { _householdId: new mongoose.Types.ObjectId() },
                { new: true }
            ).exec();

            expect(invitation._householdId).not.toEqual(mockHousehold);
        });
    });

    describe('DELETE', () => {
        test('Can delete an invitation', async () => {
            let mockHousehold = new mongoose.Types.ObjectId();
            let mockSender = new mongoose.Types.ObjectId();
            let mockReciever = new mongoose.Types.ObjectId();

            let invitation = await new InvitationModel({
                _householdId: mockHousehold,
                _senderId: mockSender,
                _recieverId: mockReciever
            }).save();

            invitation = await InvitationModel.findByIdAndDelete(invitation._id).exec();

            expect(invitation._householdId).toEqual(mockHousehold);
        });
    });
});