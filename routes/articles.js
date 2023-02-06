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
router.get('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
        if (article) {
            res.status(200).json({ article: article })
        } else {
            // if we couldn't find a document with the matching ID
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID does\'t match any documents'
                }
            });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: error });
    });
})


/**
 * Action:          DESTROY
 * Method:          DELETE
 * URI:             /api/articles/:id       e.g. /api/articles/5d664b8b68b4f5092aba18e9
 * Descriptions:    Delete an article by Article ID
 */
router.delete('/api/articles/:id', (req, res) => {
    // Two step process: 1. Find the article via the ID (so that we can error handle it if there is no article with that ID)
    // 2. Remove the article if it exists
    Article.findById(req.params.id)
        .then((article) => {
            if (article) {
            // Pass the result of Mongoose's `.remove` method to the next `.then`
                return article.remove();
            } else {
            // If we coudn't find a document with the matching ID
                res.status(404).json({
                    error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                    }
                });
            }
        })
        .then(() => {
            // If the deletion succeeded, return 204 and no JSON
            res.status(204).end();
        })
        // Catch any error that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});

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
router.post('/api/articles', (req, res) => {
    Article.create(req.body.article)
    // On a successful `create` action, respond with 201 HTTP status and the content of the new Article.
    .then((newArticle) => {
        res.status(201).json({ article: newArticle });
    })
    // Catch any error that might occur
    .catch((error) => {
        res.status(500).json({ error: error });
    });
});


// Export the Router so we can use it in the `server.js` file
module.exports = router;