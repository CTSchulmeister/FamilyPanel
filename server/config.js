module.exports = {
    databaseURL: process.env.MONGODB_URI || 'mongodb://localhost/familypanel',
    mongooseOptions: {
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: false
    },
    secret: 'myInsecureSecret'
}