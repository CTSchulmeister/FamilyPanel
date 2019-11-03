'use strict';

// --- Modules
const mongoose = require('mongoose');

const InvitationController = require('../../src/invitation/invitation.controller');
const InvitationModel = require('../../src/invitation/invitation.model');
const HouseholdModel = require('../../src/household/household.model');
const {
    randomStringGenerator,
    userFactory,
    generateEmail,
    householdFactory,
    invitationFactory
} = require('../testUtilties');

process.env.TEST_SUTE = 'familypanel-invitation-controller-test';

describe('Invitation Controller', () => {
    describe('createInvitation()', () => {
        test('Can create an invitation', async () => {
            const sender = await userFactory();
            const recieverEmail = generateEmail();
            const household = await householdFactory(sender);

            const invitation = await InvitationController.createInvitation(
                household._id,
                sender._id,
                recieverEmail
            );

            const foundInvitation = await InvitationModel.findById(invitation._id).exec();

            expect(foundInvitation).not.toBeNull();
        });

        test('Throws an error if the sender does not belong to the household', async () => {
            let error = null;

            const sender = await userFactory();
            const recieverEmail = generateEmail();
            const household = await householdFactory();

            try {
                await InvitationController.createInvitiation(
                    household._id,
                    sender._id,
                    recieverEmail
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the household does not allow all members to invite and the sender is not the household owwner', async () => {
            let error = null;

            const owner = await userFactory();
            const sender = await userFactory();
            const recieverEmail = generateEmail();
            const household = await householdFactory(owner, sender);

            await HouseholdModel.findByIdAndUpdate(household._id, {
                settings: {
                    allMembersCanInvite: false
                }
            }).exec();

            try {
                await InvitationController.createInvitation(
                    household._id,
                    sender._id,
                    recieverEmail
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the household doesn\'t exist', async () => {
            let error = null;

            const sender = await userFactory();
            const recieverEmail = generateEmail();

            try {
                await InvitationController.createInvitation(
                    new mongoose.Types.ObjectId(),
                    sender._id,
                    recieverEmail
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the senderId argument is null', async () => {
            let error = null;

            const recieverEmail = generateEmail();
            const household = await householdFactory();

            try {
                await InvitationController.createInvitation(
                    household._id,
                    null,
                    recieverEmail
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the recieverEmail argument is null', async () => {
            let error = null;

            const sender = await userFactory();
            const household = await householdFactory(sender);

            try {
                await InvitationController.createInvitation(
                    household._id,
                    sender._id,
                    null
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the householdId argument is null', async () => {
            let error = null;

            const sender = await userFactory();
            const recieverEmail = generateEmail();

            try {
                await InvitationController.createInvitation(
                    null,
                    sender._id,
                    recieverEmail
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the recieverEmail argument is not an email', async () => {
            let error = null;

            const sender = await userFactory();
            const junkString = randomStringGenerator();
            const household = await householdFactory(sender);

            try {
                await InvitationController.createInvitation(
                    household._id,
                    sender._id,
                    junkString
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });
    });

    describe('deleteInvitation()', () => {
        test('Can delete an invitation', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);
            const invitation = await invitationFactory(household);

            await InvitationController.deleteInvitation(invitation._id, user._id);

            const queryResult = await InvitationModel.findById(invitation._id).exec();

            expect(queryResult).toBeNull();
        });

        test('Returns the deleted invitation', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);
            const invitation = await invitationFactory(household);

            const returnedValue = await InvitationController.deleteInvitation(invitation._id, user._id);

            expect(returnedValue._id).toStrictEqual(invitation._id);
        });

        test('Throws an error if the invitation doesn\'t exist', async () => {
            let error = null;

            const user = await userFactory();

            try {
                await InvitationController.deleteInvitation(new mongoose.Types.ObjectId(), user._id);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the user doesn\'t belong to the household', async () => {
            let error = null;

            const nonMemberUser = await userFactory();
            const memberUser = await userFactory();
            const household = await householdFactory(memberUser);
            const invitation = await invitationFactory(household);

            try {
                await InvitationController.deleteInvitation(invitation._id, nonMemberUser._id);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the user requesting the deletion didn\'t create the invitation', async () => {
            let error = null;

            const userOne = await userFactory();
            const userTwo = await userFactory();
            const household = await householdFactory(userOne, userTwo);
            const recieverEmail = generateEmail();
            const invitation = await new InvitationModel({
                _householdId: household._id,
                _senderId: userOne._id,
                recieverEmail: recieverEmail
            }).save();

            try {
                await InvitationController.deleteInvitation(invitation._id, userTwo._id);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the invitationId argument is null', async () => {
            let error = null;

            const user = await userFactory();

            try {
                await InvitationController.deleteInvitation(null, user._id);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the userId argument is null', async () => {
            let error = null;

            const invitation = await invitationFactory();

            try {
                await InvitationController.deleteInvitation(invitation._id, null);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });
    });

    describe('getInvitationsByRecieverEmail()', () => {
        test('Returns an array of invitation documents', async () => {
            const recieverEmail = generateEmail();
            const invitationOne = await invitationFactory(null, recieverEmail);
            const invitationTwo = await invitationFactory(null, recieverEmail);

            const invitations = await InvitationController.getInvitationsByRecieverEmail(recieverEmail);

            expect(invitations).toStrictEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: invitationOne._id
                    }),
                    expect.objectContaining({
                        _id: invitationTwo._id
                    })
                ])
            );
        });

        test('Returns an empty array if no invitation documents were found', async () => {
            const recieverEmail = generateEmail();
            const invitations = await InvitationController.getInvitationsByRecieverEmail(recieverEmail);
            expect(invitations.length).toStrictEqual(0);
        });

        test('Throws an error if the recieverEmail argument is null', async () => {
            let error = null;

            try {
                await InvitationController.getInvitationsByRecieverEmail(null);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the recieverEmail argument is not an email', async () => {
            let error = null;

            try {
                await InvitationController.getInvitationsByRecieverEmail(randomStringGenerator(15));
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });
    });
});