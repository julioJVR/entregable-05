const catchError = require('../utils/catchError');
const Director = require('../models/Director');
const Movie = require('../models/Movie');

const index = catchError(async (request, response) => {
    const results = await Director.findAll({ include: Movie, order: ['id'] });

    return response.json(results);
});

const create = catchError(async (request, response) => {
    const result = await Director.create(request.body);

    return response.status(201).json(result);
});

const show = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Director.findByPk(id, { include: Movie });

    if (!result) return response.sendStatus(404);

    return response.json(result);
});

const destroy = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Director.destroy({ where: { id } });

    if (!result) return response.sendStatus(404);

    return response.sendStatus(204);
});

const update = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Director.update(
        request.body,
        { where: { id }, returning: true }
    );

    if (result[0] === 0) return response.sendStatus(404);

    return response.json(result[1][0]);
});

const setMovies = catchError(async (request, response) => {
    const { id } = request.params;

    const director = await Director.findByPk(id);

    if (!director) {
        return response.status(404).json({ error: "Director not found" });
    }

    await director.setMovies(request.body);

    const movies = await director.getMovies();

    return response.json(movies);
});

module.exports = { index, create, show, destroy, update, setMovies };