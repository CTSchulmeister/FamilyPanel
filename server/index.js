// --- Modules
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const config = require('./config');
const userRoutes = require('./user/user.routes');

// --- Database Setup
mongoose.connect(config.databaseURL, { useNewUrlParser: true})
    .then(() => console.log(`FamilyPanel server connected to database: ${ config.databaseURL }`))
    .catch(err => console.error(`Error connecting to database: ${ err }`));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// --- App Setup
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// --- Routing
app.use('/user', userRoutes);
app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// --- Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`FamilyPanel server ready on port: ${ port }`);
});