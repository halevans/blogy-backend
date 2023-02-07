// Require necessary NPM Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require our Auth Related Packages
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Require DB Configuration File
const db = require('./config/db');

// Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to MongoDB on ${db}`));

// Require Passport Strategy and Options
const strategy = require('./lib/passportStrategy');
const jwtOptions = require('./lib/passportOptions');

// Require Route Files
const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');

const saltRounds = 10; // the cost factor

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5001;
reactPort = 3000;

/** Middleware */

// Add `bodyParser` middleware which will parse JSON requests into JavaScript Objects before they reach the route files.
// The method `.use` sets up middleware for Express apps.
app.use(express.json());

// Set CORS headers on response from this API using the `cors` NPM package.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` }));

// Define our auth strategy from before
passport.use(strategy);

/**
 * Routes
 * 
 * Mount imported Routers
 */

app.use(indexRouter);
app.use(articlesRouter);

app.get('/test', (req, res) => {
    bcrypt.hash('password 123', saltRounds, (error, hash) => {  // example password of 'password 123'
        res.status(200).json({ password: hash });
    }); 
});

// Dummy User for TESTING
// Use a database for real use case
const dummyUser = {
    id: 42,
    username: 'Usman',
    password: 'password123'
};

app.post('/api/login', (req, res) => {
    // Check if user provides a username and password
    if (req.body.username && req.body.password) {
        // This should be a Database call...
        // Example:
        // User.find({username: req.body.username}), when using a database rather than dummy data
        // Check if username and password match those in database
        if (req.body.username === dummyUser.username && req.body.password === dummyUser.password) {
            // Select the information we want to send to the user.
            const payload = {
                id: dummyUser.id
            }

            // Build a JSON Web Token using the payload
            const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 600 }); // 600 seconds = 10 minutes

            // Send the JSON Web Token back to the user
            res.status(200).json({ success: true, token: token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } else {
        res.status(400).json({ error: 'Username & Password Required' });
    }
});

app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        message: 'You can only see this message with the JSON Web Token.',
        user: req.user
    });
});

// Start the server and listen for a request on the given port
app.listen(port, () => console.log(`blogy is listening on port ${port}`));