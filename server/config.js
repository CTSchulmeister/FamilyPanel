module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'unsafeJWTSecret',
    databaseURL: process.env.MONGODB_URI || 'mongodb://localhost/familypanel',
    testDatabaseURL: 'mongodb://localhost/familypanel-test',
    mongooseOptions: {
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: false
    }
}