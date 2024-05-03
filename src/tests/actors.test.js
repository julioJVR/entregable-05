require('../models');
const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/actors';

const actor = {
    firstName: 'Clint',
    lastName: 'Eastwood',
    nationality: 'USA',
    image: 'image.test/clint',
    birthday: '1930-05-31',
    movieId: 1,
};

let actorId;

test("POST 'BASE_URL' should return status code 201 and response.body.name === actor.name", async () => {
    const response = await request(app)
        .post(BASE_URL)
        .send(actor);
    
    actorId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(actor.name);
});

test("GET 'BASE_URL' should return status code 200 and response.body.length === 1", async () => {
    const response = await request(app).get(BASE_URL);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test("PUT 'BASE_URL/:id' should update the actor info", async () => {
    const newData = {
        firstName: 'Harrison',
        lastName: 'Ford',
        nationality: 'USA',
        image: 'image.test/harrison',
        birthday: '1942-07-13',
    };

    const response = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(newData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newData.name);
});

test("DELETE 'BASE_URL/:id' should return status code 204", async () => {
    const response = await request(app)
        .delete(`${BASE_URL}/${actorId}`);

    expect(response.status).toBe(204);
});