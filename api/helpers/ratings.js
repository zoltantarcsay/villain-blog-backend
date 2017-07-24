'use strict';

const util = require('util');
const uuid = require('uuid');
const db = require('./db');
const {stripMeta} = require('./db');
const posts = require('./posts');

function getCollection() {
    return db.getCollection('ratings');
}

function createRating(rating) {
    const { userId, postId, thumbsUp } = rating;
    const res = getCollection().insert({ id: uuid(), userId, postId, thumbsUp });
    thumbsUp ? posts.incrementThumbsUp(postId) : posts.incrementThumbsDown(postId);

    return stripMeta(res);
}

module.exports = {
    createRating
};
