'use strict';

const uuid = require('uuid');
const db = require('./db');
const {stripMeta} = require('./db');

function getCollection() {
    return db.getCollection('posts');
}

function getPost(id) {
    return stripMeta(getCollection().findOne({id: id}));
}

function getPosts() {
    return getCollection().find().map(post => stripMeta(post));
}

function createPost(post) {
    const {userId, body} = post;
    return stripMeta(getCollection().insert({
        id: uuid(),
        created: new Date().toISOString(),
        userId,
        body
    }));
}

function updatePost(post) {
    return stripMeta(getCollection().update(post));
}

function incrementThumbsUp(id) {
    const post = getPost(id);

    if (!post) {
        throw new Error(`Post ${id} not found`);
    }

    post.thumbsUpCount = (post.thumbsUpCount || 0) + 1;

    return updatePost(post);
}

function incrementThumbsDown(id) {
    const post = getPost(id);
    post.thumbsDownCount = (post.thumbsDownCount || 0) + 1;

    return updatePost(post);
}

module.exports = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    incrementThumbsUp,
    incrementThumbsDown
};

