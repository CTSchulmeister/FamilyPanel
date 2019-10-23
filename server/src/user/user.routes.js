'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { checkPasswordFormat } = require('../util');

const UserController = require('./user.controller');
const auth = require('../middleware/auth');

const jsonParser = bodyParser.json();

// --- Routes
// CREATE
router.post('/', jsonParser, [
    check('firstName')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The first name field cannot be left empty')
        .isString()
        .trim()
        .escape(),
    check('lastName')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The last name field cannot be left empty')
        .isString()
        .trim()
        .escape(),
    check('email')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The email field cannot be left empty')
        .custom((value, { req }) => value == req.body.retypeEmail)
            .withMessage('The input for email and retype email did not match')
        .isEmail()
            .withMessage('An invalid email was submitted')
        .normalizeEmail()
        .trim()
        .escape(),
    check('retypeEmail')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The retype email field cannot be left empty'),
    check('password')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The password field cannot be left empty')
        .custom((value, { req }) => value == req.body.retypePassword)
            .withMessage('The input for password and retype password did not match')
        .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
        .custom(value => checkPasswordFormat(value))
            .withMessage('Password must contain at least one letter, one number, and one special character')
        .isString()
        .trim(),
    check('retypePassword')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The retype password field cannot be left empty')
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors.errors
        });
    } else {
        try {
            const { user, token } = await UserController.createUser(
                req.body.firstName, 
                req.body.lastName,
                req.body.email,
                req.body.password
            );

            res.status(200).json({
                success: true,
                user: user,
                token: token
            });
        } catch (err) {
            console.error(`Error saving new user: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [{
                    msg: err.toString()
                }]
            });
        }
    }
});

// Login
router.post('/login', jsonParser, [
    check('email')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The email field cannot be left empty')
        .isEmail()
        .trim()
        .escape(),
    check('password')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The password field cannot be left empty')
        .isString()
        .trim()
], async (req, res) => {
    try {
        const { user, token, households, currentHousehold } = await UserController.loginUser(req.body.email, req.body.password);

        res.status(200).json({
            success: true,
            user: user,
            token: token,
            households: households,
            currentHousehold: currentHousehold
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            errors: [{
                msg: err.toString()
            }]
        });
    }
});

// Get current user associated with token
router.get('/me', auth, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

// Logout of this device
router.post('/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token != req.token);
        await req.user.save();
        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [err.message]
        });
    }
});

router.get('/me/households', auth, async (req, res) => {
    try {
        let households = await UserController.getHouseholds(req.user._id);

        res.status(200).json({
            success: true,
            households: households
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [err.message]
        });
    }
});

// Logout on all devices
router.post('/me/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            errors: [err.message]
        });
    }
});

// Change password
router.post('/me/change-password', auth, jsonParser, [
    check('password')
        .exists({ checkFalsy: true, checkNull: true })
        .custom((value, { req }) => value == req.body.retypePassword)
        .isString()
        .trim(),
    check('retypePassword')
        .exists({ checkFalsy: true, checkNull: true })
], async (req, res) => {
    try {
        const user = await UserController.updateUser(req.user._id, null, null, null, req.body.password);
        req.user = user;

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            errors: [err.message]
        });
    }
});

router.post('/me/change-current-household', auth, jsonParser, [
    check('currentHousehold')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The id for the new current household must be passed')
], async (req, res) => {
    try {
        const newCurrentHousehold = await UserController.changeCurrentHousehold(req.user._id, req.body.currentHousehold);

        res.status(200).json({
            success: true,
            household: newCurrentHousehold
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            errors: [err.message]
        });
    }
});

// READ
router.get('/:user', auth, async (req, res) => {
    try {
        const user = await UserController.readUser(req.params.user);

        if(req.user._id != user._id ) {
            user.hasVerifiedEmail = undefined;
            user.password = undefined;
            user.salt = undefined;
            user.tokens = undefined;
        }

        if(!req.user._householdIds.some(household => user._householdIds.includes(household))) {
            user.email = undefined;
        }

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        console.error(`Error getting user ${ req.params.user }: ${ err }`);
        res.status(404).json({
            success: false,
            errors: [err.message]
        });
    }
});

// UPDATE
router.patch('/:user', auth, jsonParser, [
    check('firstName')
        .optional()
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('If first name is being updated, the field cannot be left empty')
        .isString()
        .trim()
        .escape(),
    check('lastName')
        .optional()
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('If last name is being updated, the field cannot be left empty')
        .isString()
        .trim()
        .escape(),
    check('email')
        .optional()
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('If email is being updated, the field cannot be left empty')
        .custom((value, { req }) => value == req.body.retypeEmail)
            .withMessage('The input for email and retype email did not match')
        .isEmail()
            .withMessage('The input was not a valid email')
        .normalizeEmail()
        .trim()
        .escape(),
    check('password')
        .optional()
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('If password is being updated, the field cannot be left empty')
        .custom((value, { req }) => value == req.body.retypePassword)
            .withMessage('The password values did not match')
        .isLength({ min: 8 })
            .withMessage('Password must be at least 8 charactes long')
        .custom(value => checkPasswordFormat(value))
            .withMessage('Password must contain at least one letter, one number, and one special character')
        .isString()
        .trim()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else if(req.user._id != req.params.user) {
        res.status(401).json({
            success: false,
            errors: [`You are not authorized to update this user`]
        });
    } else {
        try {
            const firstName = (req.body.firstName) ? req.body.firstName : null;
            const lastName = (req.body.lastName) ? req.body.lastName : null;
            const email = (req.body.email) ? req.body.email : null;
            const password = (req.body.password) ? req.body.password : null;

            const user = await UserController.updateUser(
                req.params.user,
                firstName,
                lastName,
                email,
                password
            );
            
            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            console.error(`Error updating user ${ req.params.user }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err.message]
            });
        }
    }
});

// DELETE
router.delete('/:user', auth, async (req, res) => {
    if(req.user._id != req.params.user) {
        res.status(401).json({
            success: false,
            errors: [`You are not authorized to delete this user`]
        });
    } else {
        try {
            const user = await UserController.deleteUser(req.params.user);
    
            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            console.error(`Error deleting user ${ req.params.user}: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err.message]
            });
        }
    }
});

module.exports = router;