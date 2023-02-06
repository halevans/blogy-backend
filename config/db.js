// Creating a base name for thw MongoDB
const mongooseBaseName = 'blogy';

// Create the MongoDB URI for Development and Test
const database = {
    development: `mongodb://localhost:27017/${mongooseBaseName}-development`,
    test: `mongodb://localhost:27017/${mongooseBaseName}-test`
};

// Identify if development environment is Test or Development
// Select a Database based on whether a test file was executed before `server/js`
const localDB = process.env.TESTENV ? database.test : database.development;

// Environment variable MONGODB_URI will be available in Heorku production environment. Otherwise use Test or Development database.
const currentDB = process.env.MONGODB_URI || localDB;

// Export the appropriate database based on the current environment
module.exports = currentDB;