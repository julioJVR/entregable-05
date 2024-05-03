const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');

const index = catchError(async (request, response) => {
    const results = await Actor.findAll({ include: Movie, order: ['id'] });

    return response.json(results);
});

const create = catchError(async (request, response) => {
    const result = await Actor.create(request.body);

    return response.status(201).json(result);
});

const show = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Actor.findByPk(id, { include: Movie });

    if (!result) return response.sendStatus(404);

    return response.json(result);
});

const destroy = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Actor.destroy({ where: { id } });

    if (!result) return response.sendStatus(404);

    return response.sendStatus(204);
});

const update = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await Actor.update(
        request.body,
        { where: { id }, returning: true }
    );

    if (result[0] === 0) return response.sendStatus(404);

    return response.json(result[1][0]);
});

const setMovies = catchError(async (request, response) => {
    const { id } = request.params;

    const actor = await Actor.findByPk(id);

    if (! actor) {
        return response.status(404).json({ error: "Actor not found" });
    }
    await actor.setMovies(request.body);

    const movies = await actor.getMovies();

    return response.json(movies);
});

module.exports = { index, create, show, destroy, update, setMovies };