const express = require('express');
const { index, create, show, destroy, update, setMovies } = require('../controllers/director.controller');

const directorRouter = express.Router();

directorRouter.route('/')
    .get(index)
    .post(create);

directorRouter.route('/:id/movies')
    .post(setMovies);

directorRouter.route('/:id')
    .get(show)
    .delete(destroy)
    .put(update);

module.exports = directorRouter;