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
});