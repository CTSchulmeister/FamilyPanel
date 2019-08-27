'use strict';

// --- Modules
const mongoose = require('mongoose');

const HouseholdModel = require('../../src/household/household.model');

process.env.TEST_SUITE = 'familypanel-household-model-test';

describe('Household Model', () => {
    const idOne = new mongoose.Types.ObjectId;
    const idTwo = new mongoose.Types.ObjectId;
    const idThree = new mongoose.Types.ObjectId;

    describe('CREATE', () => {
        test('Can create a household', async () => {
            let household = await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            household = await HouseholdModel.findOne(household._id).exec();

            expect(household.name).toEqual('Our Apartment');
        });

        test('Does not create a household if missing data', async () => {
            const household = new HouseholdModel({
                name: 'Our Apartment'
            });
    
            household.validate((error) => {
                expect(error.name).toBe("ValidationError");
            });
        });      
    });

    describe('READ', () => {
        test('Doesn\'t find a household if that household doesn\'t exist', async () => {
            const household = await HouseholdModel.findOne(new mongoose.Types.ObjectId()).exec();

            expect(household).toBeNull();
        });
    });

    describe('UPDATE', () => {
        test('Can update a household', async () => {
            let household = await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            household = await HouseholdModel.findByIdAndUpdate(
                household._id,
                { name: 'Our Condo' },
                { new: true }).exec();

            expect(household.name).toEqual('Our Condo');
        });
    });

    describe('DELETE', () => {
        test('Can delete a household', async () => {
            let household = await new HouseholdModel({
                _ownerId: idOne,
                _memberIds: [idOne, idTwo, idThree],
                name: 'Our Apartment'
            }).save();

            household = await HouseholdModel.findByIdAndDelete(household._id).exec();

            expect(household.name).toEqual('Our Apartment');
        });
    });

    describe('Events', () => {
        describe('CREATE', () => {
            test('Can create an event', async () => {
                let household = await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment'
                }).save();

                household.events.push({
                    _creatorId: idOne,
                    title: 'Concert',
                    description: 'At the House of Blues',
                    time: '2019-10-09'
                });

                household = await household.save();
    
                expect(household.events[0].title).toEqual('Concert');
            });
        });

        describe('READ', () => {
            test('Can retrieve an event', async () => {
                const household = await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: idOne,
                        title: 'Concert',
                        description: 'At the House of Blues',
                        time: '2019-10-09'
                    }]
                }).save();

                expect(household.events[0].title).toBe('Concert');
            });
        });

        describe('UPDATE', () => {
            test('Can update an event', async () => {
                await new HouseholdModel({
                    '_ownerId': idOne,
                    '_memberIds': [idOne, idTwo, idThree],
                    'name': 'Our Apartment',
                    'events': [{
                        '_creatorId': idOne,
                        'title': 'Concert',
                        'description': 'At the House of Blues',
                        'time': '2019-10-09'
                    }]
                }).save();

                const household = await HouseholdModel.findOneAndUpdate({ 'name': 'Our Apartment', 'events.title': 'Concert' }, {
                    $set: { 'events.$.title': 'Lady Gaga Concert' }
                }, { new: true }).exec();

                expect(household.events[0].title).toBe('Lady Gaga Concert');
            });
        });

        describe('DELETE', () => {
            test('Can delete an event from a household', async () => {
                await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment',
                    events: [{
                        _creatorId: idOne,
                        title: 'Concert',
                        description: 'At the House of Blues',
                        time: '2019-10-09'
                    }]
                }).save();
    
                const household = await HouseholdModel.findOneAndUpdate({ name: 'Our Apartment' }, {
                    $pull: { events: { title: 'Concert' } }
                }, { new: true }).exec();
    
                expect(household.events.length).toBe(0);
            });
        });
    });

    describe('Notes', () => {
        describe('CREATE', () => {
            test('Can create a note', async () => {
                let household = await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment'
                }).save();
    
                household.notes.push({
                    _creatorId: idTwo,
                    title: 'Hey, guys...',
                    body: 'Remember to be washing your dishes after you use them.'
                });
    
                household = await household.save();
    
                expect(household.notes[0].title).toEqual('Hey, guys...');
            });
        });

        describe('READ', () => {
            test('Can retrieve a note', async () => {
                await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment',
                    notes: [{
                        _creatorId: idTwo,
                        title: 'Hey, guys...',
                        body: 'Remember to be washing your dishes after you use them.'
                    }]
                }).save();
    
                const household = await HouseholdModel.findOne({ name: 'Our Apartment' });

                expect(household.notes[0].title).toBe('Hey, guys...');
            });
        });

        describe('UPDATE', () => {
            test('Can update a note', async () => {
                await new HouseholdModel({
                    '_ownerId': idOne,
                    '_memberIds': [idOne, idTwo, idThree],
                    'name': 'Our Apartment',
                    'notes': [{
                        '_creatorId': idTwo,
                        'title': 'Hey, guys...',
                        'body': 'Remember to be washing your dishes after you use them.'
                    }]
                }).save();

                const household = await HouseholdModel.findOneAndUpdate({ 'name': 'Our Apartment', 'notes.title': 'Hey, guys...' }, {
                    $set: { 'notes.$.title': 'About the dishes...' }
                }, { new: true }).exec();

                expect(household.notes[0].title).toBe('About the dishes...');
            });
        });

        describe('DELETE', () => {
            test('Can delete a note from a household', async () => {
                await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment',
                    notes: [{
                        _creatorId: idTwo,
                        title: 'Hey, guys...',
                        body: 'Remember to be washing your dishes after you use them.'
                    }]
                }).save();
    
                const household = await HouseholdModel.findOneAndUpdate({ name: 'Our Apartment' }, {
                    $pull: { notes: { title: 'Hey, guys...' } }
                }, { new: true }).exec();
    
                expect(household.notes.length).toBe(0);
            });
        });
    });

    describe('Tasks', () => {
        describe('CREATE', () => {
            test('Can create a task', async () => {
                let household = await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment'
                }).save();
    
                household.tasks.push({
                    _creatorId: idTwo,
                    _assignedUserIds: [idOne, idTwo, idThree],
                    title: 'Take out the trash'
                });
    
                household = await household.save();
    
                expect(household.tasks[0]._assignedUserIds.length).toBe(3);
            });
    
            test('Can create a task without assigned users', async () => {
                await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment'
                }).save();
    
                let household = await HouseholdModel.findOne({ name: 'Our Apartment' });
    
                household.tasks.push({
                    _creatorId: idTwo,
                    title: 'Take out the trash'
                });
    
                await household.save();
    
                household = await HouseholdModel.findOne({ name: 'Our Apartment' });
    
                expect(household.tasks[0]._assignedUserIds.length).toEqual(3);
            });
        });

        describe('READ', () => {
            test('Can retrieve a task', async () => {
                const household = await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment',
                    tasks: [{
                        _creatorId: idTwo,
                        _assignedUserIds: [idOne, idTwo, idThree],
                        title: 'Take out the trash'
                    }]
                }).save();

                expect(household.tasks[0].title).toBe('Take out the trash');
            });
        });

        describe('UPDATE', () => {
            test('Can update a task', async () => {
                await new HouseholdModel({
                    '_ownerId': idOne,
                    '_memberIds': [idOne, idTwo, idThree],
                    'name': 'Our Apartment',
                    'tasks': [{
                        '_creatorId': idTwo,
                        '_assignedUserIds': [idOne, idTwo, idThree],
                        'title': 'Take out the trash'
                    }]
                }).save();

                const household = await HouseholdModel.findOneAndUpdate({ 'name': 'Our Apartment', 'tasks.title': 'Take out the trash' }, {
                    $set: { 'tasks.$.title': 'Take out the trash, please!' }
                }, { new: true }).exec();

                expect(household.tasks[0].title).toBe('Take out the trash, please!');
            });
        });

        describe('DELETE', () => {
            test('Can delete a task from a household', async () => {
                await new HouseholdModel({
                    _ownerId: idOne,
                    _memberIds: [idOne, idTwo, idThree],
                    name: 'Our Apartment',
                    tasks: [{
                        _creatorId: idTwo,
                        _assignedUserIds: [idOne, idTwo, idThree],
                        title: 'Take out the trash'
                    }]
                }).save();
    
                const household = await HouseholdModel.findOneAndUpdate({ name: 'Our Apartment' }, {
                    $pull: { tasks: { title: 'Take out the trash' } }
                }, { new: true }).exec();
    
                expect(household.tasks.length).toBe(0);
            });
        });
    });
});