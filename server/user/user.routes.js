// --- Modules
const router = require('express').Router();

const UserModel = require('./user.model');

// --- Routes
// CREATE

// READ
router.get('/:user', (req, res) => {
    UserModel.findOneById(req.params.user)
        .then(user => {
            delete user.password;

            if(user._id != req.session.user._id) {
                delete user.email;
                delete user.hasVerifiedEmail;
            }

            res.status(200).json(user);
        })
        .catch(err => {
            console.error(`Error finding user ${ req.params.user }: ${ err }`);
            res.status(404).json(err);
        });
});

// UPDATE
router.post('/', (req, res) => {

});

// DELETE

module.exports = router;