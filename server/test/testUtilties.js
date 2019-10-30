const HouseholdModel = require('../src/household/household.model');
const UserModel = require('../src/user/user.model');

const { generateSalt, generateHash } = require('../src/util');

module.exports.randomStringGenerator = (length = 5) => {
    let string = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;

    for(let i = 0; i < length; i++) {
        string += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return string;
};

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
 * @param {...Document} users - Any number of user documents to be added to the household.
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