'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');

const UserModel = require('./user.model');
const HouseholdModel = require('../household/household.model');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const exists = (value) => (value && value != '') ? true : false;

// --- Routes
// CREATE
router.post('/', urlencodedParser, [
    check('firstName')
        .custom(exists(value))
        .isString()
        .trim(),
    check('lastName')
        .custom(exists(value))
        .isString()
        .trim(),
    check('email')
        .custom(exists(value))
        .isEmail().withMessage('An invalid email was submitted')
        .custom((value, { req }) => value == req.body.retypeEmail)
        .withMessage('The email values did not match')
        .trim()
        .normalizeEmail(),
    check('password')
        .custom(exists(value))
        .trim()
        .custom((value, { req }) => value == req.body.retypePassword)
        .withMessage('The password values did not match')
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const user = await new UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }).save();

            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            console.error(`Error saving new user: ${ err }`);
            res.status(500).json({
                success: false,
                error: err
            });
        }
    }
});

// READ
router.get('/:user', async (req, res) => {
    try {
        let user = await UserModel.findOneById(req.params.user).exec();
        delete user.password;

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        console.error(`Error getting user ${ req.params.user }: ${ err }`);
        res.status(404).json({
            success: false,
            error: err
        });
    }
});

// UPDATE
router.patch('/:user', urlencodedParser, [
    check('firstName')
        .optional()
        .isString()
        .trim(),
    check('lastName')
        .optional()
        .isString()
        .trim(),
    check('email')
        .optional()
        .isEmail().withMessage('An invalid email was submitted')
        .custom((value, { req }) => value == req.body.retypeEmail)
        .trim()
        .normalizeEmail(),
    check('password')
        .optional()
        .trim()
        .custom((value, { req }) => value == req.body.retypePassword)
        .withMessage('The password values did not match')
], async (req, res) => {
    const erros = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            let user = await UserModel.findOneById(req.params.user);

            let update = {
                firstName: (req.body.firstName) ? req.body.firstName: user.firstName,
                lastName: (req.body.lastName) ? req.body.lastName: user.lastName,
                email: (req.body.email) ? req.body.email : user.email
            };

            if(req.body.password) {
                const salt = crypto.randomBytes(8).toString('hex').slice(0, 8);

                let hash = crypto.createHmac('sha256', salt);
                hash.update(req.body.password);
                hash = hash.digest('hex');
                
                update.password = hash;
                update.salt = salt;
            }

            user = await UserModel.findByIdAndUpdate(req.params.user, update, { new: true }).exec();

            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            console.error(`Error updating user ${ req.params.user }: ${ err }`);
            res.status(500).json({
                success: false,
                error: err
            });
        }
    }
});

// DELETE
router.delete('/:user', async (req, res) => {
    try {
        await HouseholdModel.updateMany({ _memberIds: { $contains: req.params.user } }, 
            { _memberIds: { $pull: req.params.user } }).exec();
        await HouseholdModel.updateMany({ events: { _creatorId: req.params.user } },
            { $pull: { events: { _creatorId: req.params.user } } }).exec();
        await HouseholdModel.updateMany({ tasks: { _creatorId: req.params.user } },
            { $pull: { tasks: { _creatorId: req.params.user } } }).exec();
        await HouseholdModel.updateMany({ tasks: { _assignedUserIds: { $conatins: req.params.user } } },
            { tasks: { _assignedUserIds: { $pull: { $elemMatch: req.params.user } } } }).exec();
        await HouseholdModel.updateMany({ notes: { _creatorId: req.params.user } },
            { $pull: { notes: { _creatorId: req.params.user } } }).exec();
        const user = await UserModel.findByIdAndDelete(req.params.user).exec();

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        console.error(`Error deleting user ${ req.params.user}: ${ err }`);
        res.status(500).json({
            success: false,
            error: err
        });
    }
});

module.exports = router;