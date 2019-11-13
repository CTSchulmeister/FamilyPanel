const mongoose = require('mongoose');

const HouseholdModel = require('../src/household/household.model');
const UserModel = require('../src/user/user.model');
const InvitationModel = require('../src/invitation/invitation.model');

const { generateSalt, generateHash } = require('../src/util');

/**
 * @description Generates a random alphabetic string
 * @param {Number} [length]
 * @returns {String}
 */
module.exports.randomStringGenerator = (length = 5) => {
    let string = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;

    for(let i = 0; i < length; i++) {
        string += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return string;
};

/**
 * @description Creates a user document
 * @returns { Promise<mongoose.Document> }
 */
module.exports.userFactory = async () => {
    const salt = generateSalt();
    const password = generateHash(this.randomStringGenerator(15), salt);

    return await new UserModel({
        firstName: this.randomStringGenerator(15),
        lastName: this.randomStringGenerator(15),
        email: `${ this.randomStringGenerator(10) }@test.com`,
        salt: salt,
        password: password
    }).save();
};

/**
 * @description Creates a household document
 * @param {mongoose.Document} [users] - Any number of user documents to be added to the household.
 * @returns {Promise<mongoose.Document>}
 */
module.exports.householdFactory = async (...users) => {
    let owner;
    let members = [];

    if(users.length > 0) {
        owner = users[0];
        users.forEach(user => members.push(user));
    } else {
        owner = await this.userFactory();
        members.push(owner);
    }

    const household = await new HouseholdModel({
        _ownerId: owner._id,
        _memberIds: members.map(member => member._id),
        name: this.randomStringGenerator(15)
    }).save();

    for(let user of users) {
        await UserModel.findByIdAndUpdate(
            user._id,
            { $push: { _householdIds: household._id } }
        ).exec();
    }

    return household;
};

module.exports.householdWithEventsFactory = async (user) => {
    const household = await this.householdFactory(user);

    return await HouseholdModel.findByIdAndUpdate(household._id, {
        $push: { events: {
            _creatorId: user._id,
            title: this.randomStringGenerator(),
            time: new Date(Date.now() + 1),
            createdAt: Date.now()
        } }
    }, { new: true }).exec();
};

module.exports.householdWithTasksFactory = async (user) => {
    const household = await this.householdFactory(user);

    return await HouseholdModel.findByIdAndUpdate(household._id, {
        $push: { tasks: {
            _creatorId: user._id,
            _assignedUserIds: [user._id],
            title: this.randomStringGenerator(),
            description: `${ this.randomStringGenerator() }\n${ this.randomStringGenerator() }`
        } }
    }, { new: true }).exec();
}

module.exports.householdWithNotesFactory = async (user) => {
    const household = await this.householdFactory(user);

    return await HouseholdModel.findByIdAndUpdate(household._id, {
        $push: { notes: {
            _creatorId: user._id,
            title: this.randomStringGenerator(),
            body: `${ this.randomStringGenerator() }\n${ this.randomStringGenerator() }`
        } }
    }, { new: true }).exec();
};

/**
 * @description Generates an email
 * @returns {String}
 */
module.exports.generateEmail = () => {
    return `${ this.randomStringGenerator(10) }@test.com`;
};

/**
 * @description Generates an invitation document
 * @param {mongoose.Document} [household]
 * @param {String} recieverEmail
 * @returns {Promise<mongoose.Document>}
 */
module.exports.invitationFactory = async (household = null, recieverEmail = null) => {
    let workingHousehold;
    let user;

    if(household === null) {
        user = await this.userFactory();
        workingHousehold = await this.householdFactory(user);
    } else {
        workingHousehold = household;
        user = await UserModel.findOne({ _householdIds: household._id }).exec();
    }

    return await new InvitationModel({
        _householdId: workingHousehold._id,
        _senderId: user._id,
        recieverEmail: recieverEmail || this.generateEmail(),
        sent: Date.now(),
        message: this.randomStringGenerator(30)
    }).save();
};

module.exports.householdSettingsFactory = () => {
    const getRandomBoolean = () => {
        return (Math.floor(Math.random() + 1) === 1) ? true : false;
    };

    return {
        allMembersCanInvite: getRandomBoolean(),
        allMembersCanCreateEvents: getRandomBoolean(),
        allMembersCanCreateTasks: getRandomBoolean(),
        allMembersCanCreateNotes: getRandomBoolean()
    };
};