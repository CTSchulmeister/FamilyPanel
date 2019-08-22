'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const HouseholdModel = require('./household.model');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const exists = (value) => (value && value != '') ? true : false;

// --- Routes (Household)
// CREATE
router.post('/', urlencodedParser, [
    check('ownerId')
        .custom(exists(value)),
    check('memberIds')
        .optional()
        .isArray(),
    check('name')
        .custom(exists(value))
        .isString()
        .trim()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const household = await new HouseholdModel({
                _ownerId: req.body.ownerId,
                _memberIds: (req.body.memberIds) ? req.body.memberIds : [],
                name: req.body.name
            }).save();

            res.status(200).json({
                success: true,
                household: household
            });
        } catch (err) {
            console.error(`Error creating household: ${ err }`);
            res.status(500).json({
                success: false,
                error: err
            });
        }
    }    
});

// READ
router.get('/:household', async (req, res) => {
    try {
        const household = await HouseholdModel.findOneById(req.params.household).exec();
        res.status(200).json({
            success: true,
            household: household
        });
    } catch (err) {
        console.error(`Error getting household ${ req.params.household }: ${ err }`);
        res.status(404).json({
            success: false,
            error: err
        });
    }
});

// UPDATE
router.patch('/:household', urlencodedParser, [
    check('ownerId')
        .optional(),
    check('memberIds')
        .optional()
        .isArray(),
    check('name')
        .optional()
        .isString()
        .trim()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            let household = await HouseholdModel.findOneById(req.params.household);

            let update = {
                _ownerId: (req.body.ownerId) ? req.body.ownerId : household._ownerId,
                _memberIds: (req.body.memberIds) ? req.body.memberIds : household._memberIds,
                name: (req.body.name) ? req.body.name : household.name
            };

            household = await HouseholdModel.findByIdAndUpdate(req.params.household, update, { new: true }).exec();

            res.status(200).json({
                success: true,
                household: household
            });
        } catch (err) {
            console.error(`Error updating household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                error: err
            });
        }
    }
});

// DELETE
router.delete('/:household', async (req, res) => {
    try {
        await UserModel.updateMany({ _householdIds: { $contains: req.params.household } },
            { _householdIds: { $pull: { $elemMatch: req.params.household } } }).exec();
        const household = await HouseholdModel.findByIdAndDelete(req.params.household).exec();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.error(`Error deleting household ${ req.params.household }: ${ err }`);
        res.status(500).json({
            success: false,
            error: err
        });
    }
});

// --- Routes (Events)
// CREATE
router.post('/:household/event', urlencodedParser, [

], async (req, res) => {

});

// READ
router.get('/:household/event/:event', async (req, res) => {
    try {
        const household = await HouseholdModel.findOne({ _id: req.params.household, events: { $contains: { _id: req.params.event } } }).exec();
        const event = household.events.filter(event => event._id == req.params.event).pop();
        res.status(200).json({
            success: true,
            event: event
        });
    } catch (err) {
        console.error(`Error retrieving event ${ req.params.event } from household ${ req.params.household}: ${ err }`);
        res.status(404).json({
            success: false,
            error: err
        });
    }
});

// UPDATE
router.put('/:household/event/:event', urlencodedParser, async (req, res) => {

});

// DELETE
router.delete('/:household/event/:event', async (req, res) => {

});

// --- Routes (Tasks)
// CREATE
router.post('/:household/task', async (req, res) => {

});

// READ
router.get('/:household/task/:task', async (req, res) => {
    try {
        const household = await HouseholdModel.findOne({ _id: req.params.household, tasks: { $contains: { _id: req.params.task } } }).exec();
        const task = household.tasks.filter(task => task._id == req.params.task).pop();
        res.status(200).json({
            success: true,
            task: task
        });
    } catch (err) {
        console.error(`Error retrieving task ${ req.params.task } from household ${ req.params.household}: ${ err }`);
        res.status(404).json({
            success: false,
            error: err
        });
    }
});

// UPDATE
router.put('/:household/task/:task', async (req, res) => {

});

// DELETE
router.put('/:household/task/:task', async (req, res) => {

});

// --- Routes (Notes)
// CREATE
router.post('/:household/note', async (req, res) => {

});

// READ
router.get('/:household/note/:note', async (req, res) => {
    try {
        const household = await HouseholdModel.findOne({ _id: req.params.household, notes: { $contains: { _id: req.params.note } } }).exec();
        const note = household.notes.filter(note => note._id == req.params.note).pop();
        res.status(200).json({
            success: true,
            note: note
        });
    } catch (err) {
        console.error(`Error retrieving note ${ req.params.note } from household ${ req.params.household}: ${ err }`);
        res.status(404).json({
            success: false,
            error: err
        });
    }
});

// UPDATE
router.put('/:household/note/:note', async (req, res) => {

});

// DELETE
router.delete('/:household/note/:note', async (req, res) => {

});

module.exports = router;