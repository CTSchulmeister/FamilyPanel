'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { generateSalt, generateHash, checkPasswordFormat } = require('./util');

const UserModel = require('./user/user.model');

const jsonParser = bodyParser.json();

// --- Routes
router.get('/register', (req, res) => {
    res.json({
        Message: 'Hello!'
    });
})

router.post('/register', jsonParser, [
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
            .withMessage('The input was not a valid email')
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
            .withMessage('Password must contain at least one letter, one number, and one special charater')
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
            if(await UserModel.findOne({ email: req.body.email }).exec() != null) {
                throw new Error(`A user with the email ${ req.body.email } already exists`);
            }

            const salt = generateSalt();
            const hashedPassword = generateHash(req.body.password, salt);

            let user = new UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                salt: salt
            });

            await user.validate((err) => {
                if(err) throw err;
            })

            user = await user.save();

            req.session.user = user._id;

            delete user.password;
            delete user.salt;

            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

router.post('/sign-in', jsonParser, [
    check('email')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('No email was entered')
        .trim()
        .isEmail()
        .escape(),
    check('password')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('No password was entered')
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
    } else {
        try {
            let user = await UserModel.findOne({ email: req.body.email }).exec();

            if(!user) {
                throw new Error(`No user was found with the email ${ req.body.email }`);
            }

            const hashedPassword = generateHash(req.body.password, user.salt);

            if(hashedPassword != user.password) {
                throw new Error(`Incorrect password`);
                console.log('Error 1');
            }

            req.session.user = user._id;

            delete user.password;
            delete user.salt;

            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

router.get('/sign-out', (req, res) => {
    if(req.session.user) {
        req.session.destroy((err) => {
            if(err) throw err;
        });

        res.status(200).json({
            success: true
        });
    } else {
        res.status(400).json({
            success: false,
            errors: [`You were not logged in`]
        });
    }
});

router.post('/change-password', jsonParser, [
    check('password')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The password field cannot be left empty')
        .custom((value, { req }) => value == req.body.retypePassword)
        .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
        .custom(value => checkPasswordFormat(value))
            .withMessage('Password must contain at least one letter, one number, one special charater')
        .isString()
        .trim()
        .escape(),
    check('retypePassword')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The retype password field cannot be left empty')
], async (req, res) => {
    if(!req.session.user) {
        res.status(400).json({
            success: false,
            errors: [`You were not logged in`]
        });
    } else {
        try {
            const salt = generateSalt();
            const hashedPassword = generateHash(req.body.password, salt);
    
            let user = UserModel.findByIdAndUpdate(req.session.user, {
                password: hashedPassword,
                salt: salt
            }, { new: true });

            if(!user) {
                throw new Error(`Error updating user with id ${ req.session.user }`);
            }

            delete user.password;
            delete user.salt;

            res.status(200).json({
                success: true,
                user: user
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

module.exports = router;