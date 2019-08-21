// --- Modules
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const config = require('../config');
const userRoutes = require('./user/user.routes');
const householdRoutes = require('./household/household.routes');

// --- Database Setup
mongoose.connect(config.databaseURL, config.mongooseOptions)
    .then(() => console.log(`FamilyPanel server connected to database: ${ config.databaseURL }`))
    .catch(err => console.error(`Error connecting to database: ${ err }`));

// --- App Setup
const app = express();
app.use(helmet());
app.use(cors());

// --- Routing
app.use('/api/user', userRoutes);
app.use('/api/household', householdRoutes);
app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// --- Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`FamilyPanel server ready on port: ${ port }`);
});

module.exports = app;