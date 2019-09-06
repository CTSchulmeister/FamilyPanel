'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { checkPasswordFormat } = require('../util');

const UserController = require('./user.controller');

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
        .trim()
        .escape(),
    check('retypePassword')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The retype password field cannot be left empty')
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const user = await UserController.createUser(
                req.body.firstName, 
                req.body.lastName,
                req.body.email,
                req.body.password);

            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            console.error(`Error saving new user: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// READ
router.get('/:user', async (req, res) => {
    try {
        const user = await UserController.readUser(req.params.user);

        if(!req.session.user || req.session.user != req.params.user) {
            delete user.email;
            delete user.hasVerifiedEmail;
            delete user._householdIds;
        }

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        console.error(`Error getting user ${ req.params.user }: ${ err }`);
        res.status(404).json({
            success: false,
            errors: [err]
        });
    }
});

// UPDATE
router.patch('/:user', jsonParser, [
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
        .escape()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else if(!req.session.user || req.session.user != req.params.user) {
        res.status(401).json({
            success: false,
            errors: [`You are unauthorized to modify user ${ req.params.user }`]
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
                errors: [err]
            });
        }
    }
});

// DELETE
router.delete('/:user', async (req, res) => {
    if(!req.session.user || req.session.user != req.params.user) {
        res.status(401).json({
            success: false,
            errors: [`You are unauthorized to delete user ${ req.session.user }`]
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
                errors: [err]
            });
        }
    }  
});

module.exports = router;