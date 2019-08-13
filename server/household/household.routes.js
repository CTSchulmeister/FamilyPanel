// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const HouseholdModel = require('./household.model');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// --- Routes
// CREATE
router.post('/', urlencodedParser, [

], (req, res) => {

});

// READ
router.get('/:household', (req, res) => {
    HouseholdModel.findOneById(req.params.household)
        .then(household => {
            res.status(200).json({
                success: true,
                household: household
            });
        })
        .catch(err => {
            console.error(`Error getting household ${ req.params.household }: ${ err }`);
            res.status(404).json({
                success: false,
                error: err
            });
        });
});

// UPDATE
router.put('/:household', urlencodedParser, (req, res) => {

});

// DELETE
router.delete('/:household', (req, res) => {
    let queries = [
        UserModel.updateMany({ _householdIds: { $contains: req.params.household } },
            { _householdIds: { $pull: { $elemMatch: req.params.household } } }),
        HouseholdModel.findByIdAndDelete(req.params.household)
    ];

    Promise.all(queries)
        .then(() => {
            res.status(200).json({
                success: true
            });
        })
        .catch(err => {
            console.error(`Error deleting household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                error: err
            });
        });
});