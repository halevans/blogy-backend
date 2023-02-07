// Passport Package
const passportJWT = require('passport-jwt');

// Passport Options
const jwtOptions = require('./passportOptions');

// JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy

// Dummy User for TESTING
// Use a database for real use case
const dummyUser = {
    id: 42,
    username: 'Usman',
    password: 'password123'
};

// The function where we are going to see if the requesting user has a valid JWT or not. And to see if the token is expired.
const strategy = new JwtStrategy(jwtOptions, (jwtPayLoad, next) => {
    console.log('Payload Received...');
    console.log(`User ID: ${jwtPayLoad.id}`);
    console.log(`Token expires on: ${jwtPayLoad.exp}`);

    if (dummyUser.id === jwtPayLoad.id) {
        // If ID is in the database, then let's run our original route
        // Example Database Call:
        // User.findById(jwtPayLoad.id)
        next(null, dummyUser); // In real use case would send back user from database
    } else {
        // If ID does not match, then skip our route and return a 401
        next(null, false);
    }
});

module.exports = strategy;