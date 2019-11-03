'use strict';

// --- Modules
const mongoose = require('mongoose');

const InvitationModel = require('../../src/invitation/invitation.model');
const {
    userFactory,
    householdFactory,
    generateEmail,
    invitationFactory
} = require('../testUtilties');

process.env.TEST_SUITE = 'familypanel-invitation-model-test';

describe('Invitation Model', () => {
    describe('CREATE', () => {
        test('Can create an invitation', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);
            const recieverEmail = generateEmail();

            const invitation = await new InvitationModel({
                _householdId: household._id,
                _senderId: user._id,
                recieverEmail: recieverEmail
            }).save();

            expect(invitation._householdId).toEqual(household._id);
        });

        test('Does not create an invitation if missing householdId', async () => {
            const user = await userFactory();
            const recieverEmail = generateEmail();

            const invitation = await new InvitationModel({
                _senderId: user._id,
                recieverEmail: recieverEmail
            });

            invitation.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });

        test('Does not create an invitation if missing senderId', async () => {
            const household = await householdFactory();
            const recieverEmail = generateEmail();

            const invitation = await new InvitationModel({
                _householdId: household._id,
                recieverEmail: recieverEmail
            });

            invitation.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });

        test('Does not create an invitation if missing recieverEmail', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);

            const invitation = await new InvitationModel({
                _senderId: user._id,
                _householdId: household._id
            });

            invitation.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });
    });

    describe('READ', () => {
        test('Can retrieve an invitation', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);
            const invitation = await invitationFactory(household);

            const foundInvitation = await InvitationModel.findById(invitation._id).exec();

            expect(foundInvitation._householdId).not.toBeNull();
        });

        test('Doesn\'t find an invitation if that invitation doesn\'t exist', async () => {
            const invitation = await InvitationModel.findOne(new mongoose.Types.ObjectId()).exec();
            
            expect(invitation).toBeNull();
        });
    });

    describe('UPDATE', () => {
        test('Can update an invitation', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);
            const invitation = await invitationFactory(household);

            const updatedInvitation = await InvitationModel.findByIdAndUpdate(
                invitation._id,
                { _householdId: new mongoose.Types.ObjectId() },
                { new: true }
            ).exec();

            expect(updatedInvitation._householdId).not.toEqual(household._id);
        });
    });

    describe('DELETE', () => {
        test('Can delete an invitation', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);
            const invitation = await invitationFactory(household);

            const deletedInvitation = await InvitationModel.findByIdAndDelete(invitation._id).exec();

            expect(deletedInvitation._householdId).toEqual(household._id);
        });
    });
});