const request = require('supertest');
const app = require('../app');
require('../models');

const BASE_URL = '/api/v1/genres';

const genre = {
    name: 'Heavy Metal',
};

let id;

test("GET 'BASE_URL' should return status code 200", async () => {
    const response = await request(app).get(BASE_URL);

    expect(response.status).toBe(200);
});

test("POST 'BASE_URL' should return status code 201 and body.name === genre.name", async () => {
    const response = await request(app)
        .post(BASE_URL)
        .send(genre);
    
    id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(genre.name);
});

test("PUT 'BASE_URL/:id' update the genre info", async () => {
    const newData = { name: 'rock' };
    const response = await request(app)
        .put(`${BASE_URL}/${id}`)
        .send(newData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newData.name);
});

test("DELETE 'BASE_URL/:id' delete the genre", async () => {
    const response = await request(app).delete(`${BASE_URL}/${id}`);

    expect(response.status).toBe(204);
});