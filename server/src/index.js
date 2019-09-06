// --- Modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const config = require('../config');
const userRoutes = require('./user/user.routes');
const householdRoutes = require('./household/household.routes');
const profileRoutes = require('./profile.routes');

// --- Database Setup
mongoose.connect(config.databaseURL, config.mongooseOptions)
    .then(() => console.log(`FamilyPanel server connected to database: ${ config.databaseURL }`))
    .catch(err => console.error(`Error connecting to database: ${ err }`));

// --- App Setup
const app = express();
app.use(helmet());
app.use(cors());
app.use(session({
    secret: config.secret,
    saveUninitialized: false,
    resave: true
}));

// --- Routing
app.use('/api/user', userRoutes);
app.use('/api/household', householdRoutes);
app.use('/profile', profileRoutes);
app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// --- Server Setup
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`FamilyPanel server ready on port: ${ port }`);
});

module.exports = app;