import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import config from './config';
import db from './db';

// --- Config
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// --- Database Config
mongoose.connect(db.databaseURL, { useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log(`FamilyPanel server connected to database: ${ db.databaseURL }`);
});
mongoose.connection.on('error', err => {
    console.log(`Error connecting to database: ${ err }`);
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// --- Server Startup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`FamilyPanel server ready on port: ${ port }`);
});