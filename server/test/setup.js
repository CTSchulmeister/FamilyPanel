'use strict';

// --- Modules
const mongoose = require('mongoose');

const config = require('../config');

beforeEach((done) => {
    /**
     * Clears the database of all collections.
     */
    let clearDatabase = () => {
        for(let i in mongoose.connection.collections) {
            mongoose.connection.collections[i].deleteMany(() => {});
        }

        return done();
    };

    if(mongoose.connection.readyState === 0) {
        mongoose.connect(`mongodb://localhost:27017/${process.env.TEST_SUITE}`, config.mongooseOptions, (err) => {
            if(err) throw err;
            return clearDatabase();
        });
    } else {
        return clearDatabase();
    }
});

afterAll((done) => {
    mongoose.disconnect();
    return done();
});