// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const UserModel = require('./user.model');

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
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            message: 'Errors in submitted data.'
        });
    } else {
        const newUser = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });

        newUser.save()
            .then(user => {
                res.status(200).json({
                    success: true,
                    message: 'New user successfully created!',
                    user: user
                })
            })
            .catch(err => {
                console.error(`Error saving new user: ${ err }`);
                res.status(500).json({
                    success: false,
                    message: err
                });
            });
    }
});

// READ
router.get('/:user', (req, res) => {
    UserModel.findOneById(req.params.user)
        .then(user => {
            delete user.password;

            if(user._id != req.session.user._id) {
                delete user.email;
                delete user.hasVerifiedEmail;
            }

            res.status(200).json({
                success: true,
                message: 'User found!',
                user: user
            });
        })
        .catch(err => {
            console.error(`Error getting user ${ req.params.user }: ${ err }`);
            res.status(404).json({
                success: false,
                message: err
            });
        });
});

// UPDATE
router.patch('/:user', (req, res) => {

});

// DELETE
router.delete('/:user', (req, res) => {
    UserModel.findOneAndDelete({ _id: req.params.user})
        .then(user => {
            delete user.email;
            delete user.hasVerifiedEmail;
            delete user.password;

            res.status(200).json({
                success: true,
                message: `User ${ req.params.user } succesfully deleted.`,
                user: user
            });
        })
        .catch(err => {
            console.error(`Error deleting user ${ req.params.user }: ${ err }`);
            res.status(404).json({ 
                success: false,
                message: err
            });
        });
});

module.exports = router;