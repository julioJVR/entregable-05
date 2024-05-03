const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const index = catchError(async (request, response) => {
    const results = await Movie.findAll({ include: [Genre, Actor, Director] });

    return response.json(results);
});

const create = catchError(async (request, response) => {
    const result = await Movie.create(request.body);

    return response.status(201).json(result);
});

const show = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Movie.findByPk(id, { include: [Genre, Actor, Director] });

    if (!result) return response.sendStatus(404);

    return response.json(result);
});

const destroy = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Movie.destroy({ where: { id } });

    if (!result) return response.sendStatus(404);

    return response.sendStatus(204);
});

const update = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Movie.update(
        request.body,
        { where: { id }, returning: true }
    );

    if (result[0] === 0) return response.sendStatus(404);

    return response.json(result[1][0]);
});

const setGenresToMovies = catchError(async (request, response) => {
    const { id } = request.params;

    const movie = await Movie.findByPk(id);

    if (!movie) {
        return response.status(404).json({ error: "Movie not found" });
    }

    await movie.setGenres(request.body);

    const genres = await movie.getGenres();

    return response.json(genres);
});

const setActorsToMovies = catchError(async (request, response) => {
    const { id } = request.params;

    const movie = await Movie.findByPk(id);

    if (!movie) {
        return response.status(404).json({ error: "Movie not found" });
    }

    await movie.setActors(request.body);

    const actors = await movie.getActors();

    return response.json(actors);
});

const setDirectorsToMovies = catchError(async (request, response) => {
    const { id } = request.params;

    const movie = await Movie.findByPk(id);

    if (!movie) {
        return response.status(404).json({ error: "Movie not found" });
    }

    await movie.setDirectors(request.body);

    const directors = await movie.getDirectors();

    return response.json(directors);
});

module.exports = {
    index,
    create,
    show,
    destroy,
    update,
    setGenresToMovies,
    setActorsToMovies,
    setDirectorsToMovies,
};