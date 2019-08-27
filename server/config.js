module.exports = {
    databaseURL: process.env.MONGODB_URI || 'mongodb://localhost/familypanel',
    mongooseOptions: {
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: false
    },
    jwksUri: 'https://familypanel.auth0.com/.well-known/jwks.json',
    jwtAudience: 'https://familypanel/',
    jwtIssuer: 'https://familypanel.auth0.com/'
}