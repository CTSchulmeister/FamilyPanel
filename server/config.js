module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'unsafeJWTSecret',
    databaseURL: process.env.MONGODB_URI || 'mongodb://localhost/familypanel'
}