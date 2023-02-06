// Require necessary NPM Package
const express = require('express');

// Require Mongoose Model for Article
const Article = require('./../models/article');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:          INDEX
 * Method:          GET
 * URI:             /api/articles
 * Descriptions:    Get all articles
 */
router.get('/api/articles', (req, res) => {
    Article.find()
    // Return all Articles as an Array
    .then((articles) => {
        res.status(200).json({ articles: articles });
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({ error: error });
    });
});


/**
 * Action:          SHOW
 * Method:          GET
 * URI:             /api/articles/:id       e.g. /api/articles/5d664b8b68b4f5092aba18e9
 * Descriptions:    Get an article by Article ID
 */


/**
 * Action:          DESTROY
 * Method:          DELETE
 * URI:             /api/articles/:id       e.g. /api/articles/5d664b8b68b4f5092aba18e9
 * Descriptions:    Delete an article by Article ID
 */


/**
 * Action:          UPDATE
 * Method:          PATCH/PUT
 * URI:             /api/articles/:id       e.g. /api/articles/5d664b8b68b4f5092aba18e9
 * Descriptions:    Update an article by Article ID
 */


/**
 * Action:          CREATE
 * Method:          POST
 * URI:             /api/articles/
 * Descriptions:    Create a new Article
 */



// Export the Router so we can use it in the `server.js` file
module.exports = router;