// Require necessary NPM Packages
const express = require('express');
const mongoose = require('mongoose');

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5001;

// Start the server and listen for a request on the given port
app.listen(port, () => console.log(`blogy is listening on port ${port}`));