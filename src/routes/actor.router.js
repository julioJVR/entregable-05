const express = require('express');
const { index, create, show, destroy, update, setMovies } = require('../controllers/actor.controller');

const actorRouter = express.Router();

actorRouter.route('/')
    .get(index)
    .post(create);

actorRouter.route('/:id/movies')
    .post(setMovies);

actorRouter.route('/:id')
    .get(show)
    .delete(destroy)
    .put(update);

module.exports = actorRouter;