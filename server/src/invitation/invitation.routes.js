'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const InvitationController = require('./invitation.controller');
const auth = require('../middleware/auth');

const jsonParser = bodyParser.json();

// --- Routes

// Create invitation
router.post('/invitation', auth, jsonParser, [
    check('householdId')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('householdId must exist'),
    check('senderId')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('senderId must exist')
        .custom((value, { req }) => value === req.user._id)
        .withMessage('You are not authorized to make an invitation on this sender\'s behalf'),
    check('recieverEmail')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('recieverEmail must exist')
        .isEmail()
        .withMessage('The value for recieverEmail does not appear to be an email')
        .normalizeEmail(),
    check('message')
        .optional()
        .isString()
        .trim()
        .escape()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors.errors
        });
    } else {
        try {
            const updatedUser = await InvitationController.createInvitation(
                String(req.body.householdId),
                String(req.body.senderId),
                req.body.recieverEmail,
                req.body.message || null
            );

            res.status(200).json({
                success: true,
                user: updatedUser
            });
        } catch (e) {
            console.error(`Error creating invitation: ${ e }`);
            res.status(500).json({
                success: false,
                errors: [{
                    msg: e.toString()
                }]
            });
        }
    }
});