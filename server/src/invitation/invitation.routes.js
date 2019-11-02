'use strict';

// --- Modules
const router = require('express').Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const InvitationController = require('./invitation.controller');
const auth = require('../middleware/auth');

const jsonParser = bodyParser.json();

// --- Routes