const express = require('express');
const router = express.Router();
const genreRouter = require('./genre.router');
const actorRouter = require('./actor.router');
const directorRouter = require('./director');
const movieRouter = require('./movie.router');

// colocar las rutas aquí
router.use('/genres', genreRouter);
router.use('/actors', actorRouter);
router.use('/directors', directorRouter);
router.use('/movies', movieRouter);

module.exports = router;