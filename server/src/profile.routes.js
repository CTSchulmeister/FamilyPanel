'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');

const UserModel = require('./user/user.model');

const urlencodedParser = bodyParser.urlencodedParser({ extended: false });

const exists = (value) => (value && value != '') ? true : false;

// --- Utility Functions
/**
 * Generates an 8 character salt.
 */
const generateSalt = () => {
    return crypto.randomBytes(8).toString('hex').slice(0, 8);
}

/**
 * Hashes a password with the passed salt.
 * @param {String} password 
 * @param {String} salt 
 */
const generateHash = (password, salt) => {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    hash = hash.digest('hex');

    return hash;
};

// --- Routes
router.post('/register', urlencodedParser, [
    check('firstName')
        .custom(value => exists(value))
        .isString()
        .trim()
        .escape(),
    check('lastName')
        .custom(value => exists(value))
        .isString()
        .trim()
        .escape(),
    check('email')
        .custom(value => exists(value))
        .custom(value => value == req.body.retypeEmail)
        .withMessage('The input for email and retype email did not match')
        .isEmail()
        .trim()
        .escape(),
    check('password')
        .custom(value => exists(value))
        .custom(value => value == req.body.retypePassword)
        .withMessage('The input for password and retype password did not match')
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

router.post('/signin', urlencodedParser, [
    check('email')
        .custom(value => exists(value))
        .trim()
        .isEmail()
        .escape(),
    check('password')
        .custom(value => exists(value))
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

            let hash = crypto.createHmac('sha256', user.salt);
            hash.update(req.body.password);
            const hashedPassword = hash.digest('hex');

            if(hashedPassword != user.password) {
                throw new Error(`Incorrect password`);
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

router.get('/signout', (req, res) => {
    if(req.session.user) {
        req.session.user = null;

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

router.post('/change-password', urlencodedParser, [
    check('password')
        .custom(value => exists(value))
        .custom(value => value == req.body.retypePassword)
        .isString()
        .trim()
        .escape()
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