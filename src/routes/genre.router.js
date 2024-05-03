const express = require('express');
const { index, create, show, destroy, update } = require('../controllers/genre.controller');

const genreRouter = express.Router();

genreRouter.route('/')
    .get(index)
    .post(create);

genreRouter.route('/:id')
    .get(show)
    .delete(destroy)
    .put(update);

module.exports = genreRouter;