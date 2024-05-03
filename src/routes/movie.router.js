const express = require('express');
const {
    index,
    create,
    show,
    destroy,
    update,
    setGenresToMovies,
    setActorsToMovies,
    setDirectorsToMovies,
} = require('../controllers/movie.controller');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(index)
    .post(create);

movieRouter.route('/:id/genres')
    .post(setGenresToMovies);

movieRouter.route('/:id/actors')
    .post(setActorsToMovies);

movieRouter.route('/:id/directors')
    .post(setDirectorsToMovies);

movieRouter.route('/:id')
    .get(show)
    .delete(destroy)
    .put(update);

module.exports = movieRouter;