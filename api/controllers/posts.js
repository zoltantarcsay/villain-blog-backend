'use strict';

const posts = require('../helpers/posts');

function getPosts(req, res) {
    try {
        res.send(posts.getPosts());
    } catch (err) {
        console.error(err);
        const {message} = err;
        res.status(500).send({message});
    }
}

function createPost(req, res) {
    try {
        res.send(posts.createPost(req.body));
    } catch (err) {
        console.error(err);
        const {message} = err;
        res.status(500).send({message});
    }
}

module.exports = {
    getPosts,
    createPost
};
