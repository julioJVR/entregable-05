require('../models');
const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const URL_BASE = '/api/v1/movies';

const movie = {
    name: 'Blade Runner',
    image: 'blade-runner.jpg',
    synopsis: 'randomText',
    releaseYear: 1982,
};

let movieId;

test('POST -> URL_BASE should return status code 201 and create a new movie', async () => {
    const response = await request(app)
        .post(URL_BASE)
        .send(movie);

    movieId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(movie.name);
});

test('GET -> URL_BASE should return status code 200 and body length === 1', async () => {
    const response = await request(app).get(URL_BASE);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test('PUT -> URL_BASE/:id should return status code 200 and update the movie data', async () => {
    const data = {
        name: 'Blade Runner 2049',
        image: 'blade-runner-2049.jpg',
        synopsis: 'randomText',
        releaseYear: 2017,
    };

    const response = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(data);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(data.name);
});

test('POST -> URL_BASE/:id/actors should return status code 200 and update the movie data', async () => {
    const actor = await Actor.create({
        firstName: 'Jodi',
        lastName: 'Foster',
        nationality: 'USA',
        image: 'image.test/jodi-foster',
        birthday: '1962-11-19',
    });

    const response = await request(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([actor.id]);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
    expect(response.body[0].movie_actor.actorId).toBe(actor.id);
    expect(response.body[0].movie_actor.movieId).toBe(movieId);

    await actor.destroy();
});

test('POST -> URL_BASE/:id/directors should return status code 200 and update the movie data', async () => {
    const director = await Director.create({
        firstName: 'Jodi',
        lastName: 'Foster',
        nationality: 'USA',
        image: 'image.test/jodi-foster',
        birthday: '1962-11-19',
    });

    const response = await request(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([director.id]);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
    expect(response.body[0].movie_director.directorId).toBe(director.id);
    expect(response.body[0].movie_director.movieId).toBe(movieId);

    await director.destroy();
});

test('POST -> URL_BASE/:id/genres should return status code 200 and update the movie data', async () => {
    const genre = await Genre.create({name:'Thriller'});

    const response = await request(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([genre.id]);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
    expect(response.body[0].movie_genre.genreId).toBe(genre.id);
    expect(response.body[0].movie_genre.movieId).toBe(movieId);

    await genre.destroy();
});

test('DELETE -> URL_BASE/:id should return 204 and delete the movie', async () => {
    const response = await request(app)
        .delete(`${URL_BASE}/${movieId}`);

    expect(response.statusCode).toBe(204);
});