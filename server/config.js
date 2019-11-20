module.exports = {
    databaseURL: process.env.MONGODB_URL || 'mongodb://localhost/familypanel',
    mongooseOptions: {
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: false,
        useUnifiedTopology: true
    },
    PORT: 8080,
    JWT_KEY: 'insecureJWTKey'
}