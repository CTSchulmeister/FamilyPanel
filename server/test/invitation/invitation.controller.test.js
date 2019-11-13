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

        test('Can handle string inputs in place of ObjectIds', async () => {
            const sender = await userFactory();
            const recieverEmail = generateEmail();
            const household = await householdFactory(sender);

            const invitation = await InvitationController.createInvitation(
                String(household._id),
                String(sender._id),
                recieverEmail
            );

            const foundInvitation = await InvitationModel.findById(invitation._id).exec();

            expect(foundInvitation).not.toBeNull();
        });

        test('Throws an error if an invitation to this household already exists for the reciever', async () => {
            let error = null;

            const sender = await userFactory();
            const recieverEmail = generateEmail();
            const household = await householdFactory(sender);

            try {
                await InvitationController.createInvitation(
                    household._id,
                    sender._id,
                    recieverEmail
                );

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

        test('Throws an error if the sender does not belong to the household', async () => {
            let error = null;

            const sender = await userFactory();
            const recieverEmail = generateEmail();
            const household = await householdFactory();

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

    describe('deleteInvitationBySender()', () => {
        test('Deletes an invitation', async () => {
            const invitation = await invitationFactory();

            await InvitationController.deleteInvitationBySender(
                invitation._id,
                invitation._senderId
            );

            const queryResult = await InvitationModel.findById(invitation._id).exec();

            expect(queryResult).toBeNull();
        });

        test('Can handle strings in place of ObjectIds', async () => {
            const invitation = await invitationFactory();

            await InvitationController.deleteInvitationBySender(
                String(invitation._id),
                String(invitation._senderId)
            );

            const queryResult = await InvitationModel.findById(invitation._id).exec();

            expect(queryResult).toBeNull();
        });

        test('Throws an error if the invitationId argument is not a valid ObjectId', async () => {
            const invitation = await invitationFactory();
            let error = null;

            try {
                await InvitationController.deleteInvitationBySender(
                    'asdkn;da',
                    invitation._senderId
                ); 
            } catch (e) { 
                error = e;
            }
            
            expect(error).not.toBeNull();
        });

        test('Throws an error if the senderId argument is not a valid ObjectId', async () => {
            const invitation = await invitationFactory();
            let error = null;

            try {
                await InvitationController.deleteInvitationBySender(
                    invitation._id,
                    'asdfsac;'
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the senderId does not belong to the invitationId', async () => {
            const invitation = await invitationFactory();
            let error = null;
            
            try {
                 await InvitationController.deleteInvitationBySender(
                     invitation._id,
                     new mongoose.Types.ObjectId()
                 );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });
    });

    describe('deleteInvitationByReciever()', () => {
        test('Deletes an invitation', async () => {
            const invitation = await invitationFactory();

            await InvitationController.deleteInvitationByReciever(
                invitation._id,
                invitation.recieverEmail
            );

            const queryResult = await InvitationModel.findById(invitation._id).exec();

            expect(queryResult).toBeNull();
        });

        test('Can handle strings in place of ObjectIds', async () => {
            const invitation = await invitationFactory();

            await InvitationController.deleteInvitationByReciever(
                String(invitation._id),
                invitation.recieverEmail
            );

            const queryResult = await InvitationModel.findById(invitation._id).exec();

            expect(queryResult).toBeNull();
        });

        test('Throws an error if the invitationId is not a valid ObjectId', async () => {
            const invitation = await invitationFactory();
            let error = null;

            try {
                await InvitationController.deleteInvitationByReciever(
                    'asdfasdf',
                    invitation.recieverEmail
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the recieverEmail is not a valid email', async () => {
            const invitation = await invitationFactory();
            let error = null;

            try {
                await InvitationController.deleteInvitationByReciever(
                    invitation._id,
                    'asdfadsfa'
                );
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the recieverEmail does not belong to the invitationId', async () => {
            const invitation = await invitationFactory();
            const email = generateEmail();
            let error = null;

            try {
                await InvitationController.deleteInvitationByReciever(
                    invitation._id,
                    email
                );
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

        test('Returns the name of the household in the invitation document', async () => {
            const user = await userFactory();
            const household = await householdFactory(user);
            const invitation = await invitationFactory(household);

            const returnedInvitations = await InvitationController.getInvitationsByRecieverEmail(invitation.recieverEmail);

            expect(returnedInvitations[0].householdName).toStrictEqual(household.name);
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

    describe('acceptInvitation()', () => {
        test('Accepts the invitation', async () => {
            const sender = await userFactory();
            const reciever = await userFactory();
            const household = await householdFactory(sender);
            const invitation = await invitationFactory(household, reciever.email);

            await InvitationController.acceptInvitation(
                invitation._id, 
                reciever._id
            );

            const queryResult = await InvitationModel.findById(invitation._id).exec();

            expect(queryResult).toBeNull();
        });

        test('Can handle strings in place of objectIds', async () => {
            const sender = await userFactory();
            const reciever = await userFactory();
            const household = await householdFactory(sender);
            const invitation = await invitationFactory(household, reciever.email);

            await InvitationController.acceptInvitation(
                String(invitation._id), 
                String(reciever._id)
            );

            const queryResult = await InvitationModel.findById(invitation._id).exec();

            expect(queryResult).toBeNull();
        });

        test('Adds the reciever to the household', async () => {
            const sender = await userFactory();
            const reciever = await userFactory();
            const household = await householdFactory(sender);
            const invitation = await invitationFactory(household, reciever.email);

            await InvitationController.acceptInvitation(invitation._id, reciever._id);

            const updatedHousehold = await HouseholdModel.findById(household._id).exec();

            expect(updatedHousehold._memberIds.includes(reciever._id)).toStrictEqual(true);
        });

        test('Returns the updated user', async () => {
            const sender = await userFactory();
            const reciever = await userFactory();
            const household = await householdFactory(sender);
            const invitation = await invitationFactory(household, reciever.email);

            const { updatedUser } = await InvitationController.acceptInvitation(invitation._id, reciever._id);

            expect(updatedUser._id).toStrictEqual(reciever._id);
        });

        test('Returns the joined household', async () => {
            const sender = await userFactory();
            const reciever = await userFactory();
            const newHousehold = await householdFactory(sender);
            const invitation = await invitationFactory(newHousehold, reciever.email);

            const { household } = await InvitationController.acceptInvitation(invitation._id, reciever._id);

            expect(household._id).toStrictEqual(newHousehold._id);
        });

        test('Throws an error if the recieverId does not match the invitation\'s recieverId', async () => {
            const user = await userFactory();
            const invitation = await invitationFactory();
            let error = null;

            try {
                await InvitationController.acceptInvitation(invitation._id, user._id);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the invitationId argument is null', async () => {
            let error = null;
            const reciever = await userFactory();

            try {
                await InvitationController.acceptInvitation(null, reciever._id);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if the recieverId argument is null', async () => {
            let error = null;
            const invitation = await invitationFactory();

            try {
                await InvitationController.acceptInvitation(invitation._id, null);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if no invitation with the passed id is found', async () => {
            let error = null;
            const reciever = await userFactory();

            try {
                await InvitationController.acceptInvitation(new mongoose.Types.ObjectId(), reciever._id);
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        test('Throws an error if no user with the passed id is found', async () => {
            let error = null;
            const invitation = await invitationFactory();

            try {
                await InvitationController.acceptInvitation(invitation._id, new mongoose.Types.ObjectId());
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });
    });
});