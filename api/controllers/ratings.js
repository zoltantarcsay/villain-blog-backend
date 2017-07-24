'use strict';

const ratings = require('../helpers/ratings');

function createRating(req, res) {
    try {
        res.send(ratings.createRating(req.body));
    } catch (err) {
        console.error(err);
        const {message} = err;
        res.status(500).send({message});
    }
}

module.exports = {
    createRating
};

