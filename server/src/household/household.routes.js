'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const HouseholdController = require('./household.controller');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const exists = (value) => (value && value != '') ? true : false;

// --- Routes (Household)
// CREATE
router.post('/', urlencodedParser, [
    check('ownerId')
        .custom(value => exists(value)),
    check('memberIds')
        .optional()
        .isArray(),
    check('name')
        .custom(value => exists(value))
            .withMessage('The name field cannot be left empty')
        .isString()
        .trim()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const household = await HouseholdController.createHousehold(
                req.body.ownerId,
                req.body.memberIds,
                req.body.name
            );

            res.status(200).json({
                success: true,
                household: household
            });
        } catch (err) {
            console.error(`Error creating household: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }    
});

// READ
router.get('/:household', async (req, res) => {
    try {
        const household = await HouseholdController.readHousehold(req.params.household);
        res.status(200).json({
            success: true,
            household: household
        });
    } catch (err) {
        console.error(`Error getting household ${ req.params.household }: ${ err }`);
        res.status(404).json({
            success: false,
            errors: [err]
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
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const ownerId = (req.body.ownerId) ? req.body.ownerId : null;
            const memberIds = (req.body.memberIds) ? req.body.memberIds : null;
            const name = (req.body.name) ? req.body.name : null;

            const household = await HouseholdController.updateHousehold(
                req.params.household,
                ownerId, 
                memberIds, 
                name
            );

            res.status(200).json({
                success: true,
                household: household
            });
        } catch (err) {
            console.error(`Error updating household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// DELETE
router.delete('/:household', async (req, res) => {
    try {
        const household = await HouseholdController.deleteHousehold(req.params.household);

        res.status(200).json({
            success: true,
            household: household
        });
    } catch (err) {
        console.error(`Error deleting household ${ req.params.household }: ${ err }`);
        res.status(500).json({
            success: false,
            errors: [err]
        });
    }
});

// --- Routes (Events)
// CREATE
router.post('/:household/event', urlencodedParser, [
    check('creatorId')
        .custom(value => exists(value)),
    check('title')
        .custom(value => exists(value))
        .isString()
        .trim(),
    check('description')
        .optional()
        .isString()
        .trim(),
    check('time')
        .optional()
        .trim()
        .isISO8601(),
    check('location')
        .optional()
        .isArray()
        .custom(value => value.length == 2)
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const description = (req.body.description) ? req.body.description : null;
            const time = (req.body.time) ? req.body.time : null;
            const location = (req.body.location) ? req.body.location : null;

            const event = await HouseholdController.createEvent(
                req.params.household,
                req.body.creatorId,
                req.body.title,
                description,
                time,
                location
            )

            res.status(200).json({
                success: true,
                event: event
            });
        } catch (err) {
            console.error(`Error creating event on household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// READ
router.get('/:household/event/:event', async (req, res) => {
    try {
        const event = await HouseholdController.readEvent(req.params.household, req.params.event);

        res.status(200).json({
            success: true,
            event: event
        });
    } catch (err) {
        console.error(`Error retrieving event ${ req.params.event } from household ${ req.params.household}: ${ err }`);
        res.status(404).json({
            success: false,
            errors: [err]
        });
    }
});

// UPDATE
router.put('/:household/event/:event', urlencodedParser, [
    check('title')
        .optional()
        .isString()
        .trim(),
    check('time')
        .optional()
        .trim()
        .isISO8601(),
    check('description')
        .optional()
        .isString()
        .trim(),
    check('location')
        .optional()
        .isArray()
        .custom(value => value.length == 2)
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else if(!req.body.title && !req.body.time && !req.body.description && !req.body.location) {
        res.status(400).json({
            success: false,
            errors: [`No update values were passed to update event ${ req.params.event }`]
        });
    } else {
        try {
            const title = (req.body.title) ? req.body.title : null;
            const time = (req.body.time) ? req.body.time : null;
            const description = (req.body.description) ? req.body.description : null;
            const location = (req.body.location) ? req.body.location : null;

            const event = await HouseholdController.updateEvent(
                req.params.household,
                req.params.event,
                title,
                time,
                description,
                location
            );

            res.status(200).json({
                success: true,
                event: event
            });
        } catch (err) {
            console.error(`Error updating event ${ req.params.event } from household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// DELETE
router.delete('/:household/event/:event', async (req, res) => {
    try {
        const event = await HouseholdController.deleteEvent(req.params.household, req.params.event);

        res.status(200).json({
            success: true,
            event: event
        });
    } catch (err) {
        console.error(`Error deleting event ${ req.params.event } from household ${ req.params.household }: ${ err }`);
        res.status(500).json({
            success: false,
            errors: [err]
        });
    }
});

// --- Routes (Tasks)
// CREATE
router.post('/:household/task', [
    check('creatorId')
        .custom(value => exists(value)),
    check('title')
        .custom(value => exists(value))
        .isString()
        .trim(),
    check('assignedUserIds')
        .optional()
        .isArray(),
    check('description')
        .optional()
        .isString()
        .trim(),
    check('completeBy')
        .optional()
        .isISO8601()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const assignedUserIds = (req.body.assignedUserIds) ? req.body.assignedUserIds : null;
            const description = (req.body.description) ? req.body.description : null;
            const completeBy = (req.body.completeBy) ? req.body.completeBy : null;
            
            const task = await HouseholdController.createTask(
                req.params.household,
                req.body.creatorId,
                req.body.title,
                assignedUserIds,
                description,
                completeBy
            );

            res.status(200).json({
                success: true,
                task: task
            });
        } catch (err) {
            console.error(`Error creating task on household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// READ
router.get('/:household/task/:task', async (req, res) => {
    try {
        const task = await HouseholdController.readTask(req.params.household, req.params.task);

        res.status(200).json({
            success: true,
            task: task
        });
    } catch (err) {
        console.error(`Error retrieving task ${ req.params.task } from household ${ req.params.household}: ${ err }`);
        res.status(404).json({
            success: false,
            errors: [err]
        });
    }
});

// UPDATE
router.put('/:household/task/:task', [
    check('assignedUserIds')
        .optional()
        .isArray(),
    check('title')
        .optional()
        .isString()
        .trim(),
    check('description')
        .optional()
        .isString()
        .trim(),
    check('completeBy')
        .optional()
        .isISO8601(),
    check('completed')
        .optional()
        .isBoolean()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else if(!req.body.assignedUserIds && !req.body.title && !req.body.description && !req.body.completeBy && !req.body.completed) {
        res.status(400).json({
            success: false,
            errors: [`No update values were passed to update task ${ req.params.task }`]
        });
    } else {
        try {
            const assignedUserIds = (req.body.assignedUserIds) ? req.body.assignedUserIds : null;
            const title = (req.body.title) ? req.body.title : null;
            const description = (req.body.description) ? req.body.description : null;
            const completeBy = (req.body.completeBy) ? req.body.completeBy : null;
            const completed = (req.body.completed) ? req.body.completed : null;

            const task = await HouseholdController.updateTask(
                req.params.household,
                req.params.task,
                assignedUserIds,
                title,
                description,
                completeBy,
                completed
            );

            res.status(200).json({
                success: true,
                task: task
            });
        } catch (err) {
            console.error(`Error updating task ${ req.params.task } from household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// DELETE
router.delete('/:household/task/:task', async (req, res) => {
    try {
        const task = await HouseholdController.deleteTask(req.params.household, req.params.task);

        res.status(200).json({
            success: true,
            task: task
        });
    } catch (err) {
        console.error(`Error updating task ${ req.params.task } from household ${ req.params.household }: ${ err }`);
        res.status(500).json({
            success: false,
            errors: [err]
        });
    }
});

// --- Routes (Notes)
// CREATE
router.post('/:household/note', [
    check('creatorId')
        .custom(value => exists(value)),
    check('title')
        .custom(value => exists(value))
        .isString()
        .trim(),
    check('body')
        .optional()
        .isString()
        .trim()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else {
        try {
            const body = (req.body.body) ? req.body.body : null;

            const note = await HouseholdController.createNote(
                req.params.household,
                req.body.creatorId,
                req.body.title,
                body
            );

            res.status(200).json({
                success: true,
                note: note
            });
        } catch (err) {
            console.error(`Error creating note on household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// READ
router.get('/:household/note/:note', async (req, res) => {
    try {
        const note = await HouseholdController.readNote(req.params.household, req.params.note);

        res.status(200).json({
            success: true,
            note: note
        });
    } catch (err) {
        console.error(`Error retrieving note ${ req.params.note } from household ${ req.params.household}: ${ err }`);
        res.status(404).json({
            success: false,
            errors: [err]
        });
    }
});

// UPDATE
router.put('/:household/note/:note', [
    check('title')
        .optional()
        .isString()
        .trim(),
    check('body')
        .optional()
        .isString()
        .trim()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors
        });
    } else if(!req.body.title && !req.body.body) {
        res.status(400).json({
            success: false,
            errors: [`No update values were passed to update note ${ req.params.note }`]
        });
    } else {
        try {
            const title = (req.body.title) ? req.body.title : null;
            const body = (req.body.body) ? req.body.body : null;

            const note = await HouseholdController.updateNote(
                req.params.household,
                req.params.note,
                title,
                body
            );

            res.status(200).json({
                success: true,
                note: note
            });
        } catch (err) {
            console.error(`Error updating note ${ req.params.note } from household ${ req.params.household }: ${ err }`);
            res.status(500).json({
                success: false,
                errors: [err]
            });
        }
    }
});

// DELETE
router.delete('/:household/note/:note', async (req, res) => {
    try {
        const note = await HouseholdController.deleteNote(req.params.household, req.params.note);

        res.status(200).json({
            success: true,
            note: note
        });
    } catch (err) {
        console.error(`Error updating note ${ req.params.note } from household ${ req.params.hosehold }: ${ err }`);
        res.status(500).json({
            success: false,
            errors: [err]
        });
    }
});

module.exports = router;