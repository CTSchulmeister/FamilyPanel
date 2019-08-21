'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const UserModel = require('./user.model');
const HouseholdModel = require('../household/household.model');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// --- Routes
// CREATE
router.post('/', urlencodedParser, [
    check('firstName')
        .custom(value => (value && value != '') ? true : false)
        .isString()
        .trim(),
    check('lastName')
        .custom(value => (value && value != '') ? true : false)
        .isString()
        .trim(),
    check('email')
        .custom(value => (value && value != '') ? true : false)
        .isEmail().withMessage('An invalid email was submitted')
        .trim()
        .normalizeEmail(),
    check('password')
        .custom(value => (value && value != '') ? true : false)
        .trim(),
    check('retypePassword')
        .custom(value => (value && value != '') ? true : false)
        .trim()
        .custom((value, { req }) => value == req.body.password)
        .withMessage('The password values did not match.')
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            error: 'Errors in submitted data.'
        });
    } else {
        try {
            const newUser = new UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
    
            const user = await newUser.save();

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
router.put('/:user', urlencodedParser, async (req, res) => {

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