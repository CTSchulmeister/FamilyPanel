'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const HouseholdController = require('./household.controller');
const auth = require('../middleware/auth');

const jsonParser = bodyParser.json();

// --- Routes (Household)
// CREATE
router.post('/', auth, jsonParser, [
    check('ownerId')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The ownerId field cannot be left empty'),
    check('memberIds')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The memberIds field cannot be left empty')
        .isArray()
        .custom(value => value.length >= 1)
            .withMessage('The memberIds field must have at least one member'),
    check('name')
        .exists({ checkFalsy: true, checkNull: true })
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
    } else if(req.user._id != req.body.ownerId) {
        res.status(400).json({
            success: false,
            errors: [`You are not authorized to create a household with this ownerId`]
        });
    } else {
        try {
            let memberIds = req.body.memberIds.map(memberId => String(memberId));

            const { newHousehold, households, updatedUser } = await HouseholdController.createHousehold(
                String(req.body.ownerId),
                memberIds,
                req.body.name
            );

            res.status(200).json({
                success: true,
                currentHousehold: newHousehold,
                households: households,
                user: updatedUser
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
router.get('/:household', auth, async (req, res) => {
    try {
        const household = await HouseholdController.readHousehold(
            String(req.params.household)
        );

        if(!household._memberIds.includes(req.user._id)) {
            household.events = undefined;
            household.tasks = undefined;
            household.notes = undefined;
        }

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

router.get('/:household/members', auth, async (req, res) => {
    try {
        const members  = await HouseholdController.getMembersFromHousehold(
            String(req.params.household), 
            String(req.user._id)
        );

        res.status(200).json({
            success: true,
            members: members
        });
    } catch (err) {
        console.error(`Error getting members from household ${ req.params.household }: ${ err }`);
        res.status(500).json({
            success: false,
            errors: [...err]
        });
    }
});

// UPDATE
router.patch('/:household', auth, jsonParser, [
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
            let household = await HouseholdController.readHousehold(
                String(req.params.household)
            );

            if(household._ownerId != req.user._id) {
                res.status(400).json({
                    success: false,
                    errors: []
                });
            }

            const ownerId = (req.body.ownerId) ? req.body.ownerId : null;
            const memberIds = (req.body.memberIds) ? req.body.memberIds : null;
            const name = (req.body.name) ? req.body.name : null;

            household = await HouseholdController.updateHousehold(
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
        const household = await HouseholdController.deleteHousehold(
            String(req.params.household)
        );

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
router.post('/:household/event', jsonParser, [
    check('creatorId')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The creatorId field cannot be left empty'),
    check('title')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The title field cannot be left empty')
        .isString()
        .trim()
        .escape(),
    check('description')
        .optional()
        .isString()
        .trim()
        .escape(),
    check('time')
        .optional()
        .trim()
        .escape()
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

            const household = await HouseholdController.createEvent(
                String(req.params.household),
                String(req.body.creatorId),
                req.body.title,
                description,
                time,
                location
            )

            res.status(200).json({
                success: true,
                household: household
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
        const event = await HouseholdController.readEvent(
            String(req.params.household), 
            String(req.params.event)
        );

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
router.put('/:household/event/:event', jsonParser, [
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

            const household = await HouseholdController.updateEvent(
                String(req.params.household),
                String(req.params.event),
                title,
                time,
                description,
                location
            );

            res.status(200).json({
                success: true,
                household: household
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
        const household = await HouseholdController.deleteEvent(
            String(req.params.household), 
            String(req.params.event)
        );

        res.status(200).json({
            success: true,
            household: household
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
router.post('/:household/task', jsonParser, [
    check('creatorId')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The creatorId field cannot be left empty'),
    check('title')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The title field cannot be left empty')
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
            
            const household = await HouseholdController.createTask(
                String(req.params.household),
                String(req.body.creatorId),
                req.body.title,
                assignedUserIds,
                description,
                completeBy
            );

            res.status(200).json({
                success: true,
                household: household
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
        const task = await HouseholdController.readTask(
            String(req.params.household), 
            String(req.params.task)
        );

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
router.put('/:household/task/:task', jsonParser, [
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
            const assignedUserIds = (req.body.assignedUserIds) ? req.body.assignedUserIds.map(userId => String(userId)) : null;
            const title = (req.body.title) ? req.body.title : null;
            const description = (req.body.description) ? req.body.description : null;
            const completeBy = (req.body.completeBy) ? req.body.completeBy : null;
            const completed = (req.body.completed) ? req.body.completed : null;

            const household = await HouseholdController.updateTask(
                String(req.params.household),
                String(req.params.task),
                assignedUserIds,
                title,
                description,
                completeBy,
                completed
            );

            res.status(200).json({
                success: true,
                household: household
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
        const household = await HouseholdController.deleteTask(
            String(req.params.household), 
            String(req.params.task)
        );

        res.status(200).json({
            success: true,
            household: household
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
router.post('/:household/note', auth, jsonParser, [
    check('title')
        .exists({ checkFalsy: true, checkNull: true })
            .withMessage('The title field cannot be left empty')
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

            const household = await HouseholdController.createNote(
                String(req.params.household),
                String(req.user._id),
                req.body.title,
                body
            );

            res.status(200).json({
                success: true,
                household: household
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
        const note = await HouseholdController.readNote(
            String(req.params.household), 
            String(req.params.note)
        );

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
router.put('/:household/note/:note', auth, jsonParser, [
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

            const household = await HouseholdController.updateNote(
                String(req.params.household),
                String(req.params.note),
                title,
                body
            );

            res.status(200).json({
                success: true,
                household: household
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
router.delete('/:household/note/:note', auth, async (req, res) => {
    try {
        const household = await HouseholdController.deleteNote(
            String(req.params.household), 
            String(req.user._id), 
            String(req.params.note)
        );

        res.status(200).json({
            success: true,
            household: household
        });
    } catch (err) {
        console.error(`Error deleting note ${ req.params.note } from household ${ req.params.household }: ${ err }`);
        res.status(500).json({
            success: false,
            errors: [err]
        });
    }
});

module.exports = router;