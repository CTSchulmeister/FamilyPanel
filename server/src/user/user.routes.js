'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const UserController = require('./user.controller');

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
        .normalizeEmail()
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
                error: err
            });
        }
    }
});

// READ
router.get('/:user', async (req, res) => {
    try {
        const user = await UserController.readUser(req.params.user);

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
        .normalizeEmail()
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
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            errors: errors
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
                error: err
            });
        }
    }
});

// DELETE
router.delete('/:user', async (req, res) => {
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
            error: err
        });
    }
});

module.exports = router;