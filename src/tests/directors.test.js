require('../models');
const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/directors';

const director = {
    firstName: 'Clint',
    lastName: 'Eastwood',
    nationality: 'USA',
    image: 'image.test/clint',
    birthday: '1930-05-31',
};

let directorId;

test("POST 'BASE_URL' should return status code 201 and response.body.name === director.name", async () => {
    const response = await request(app)
        .post(BASE_URL)
        .send(director);

    directorId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(director.name);
});

test("GET 'BASE_URL' should return status code 200 and response.body.length === 1", async () => {
    const response = await request(app).get(BASE_URL);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test("PUT 'BASE_URL/:id' should update the director info", async () => {
    const newData = {
        firstName: 'Francis',
        lastName: 'Ford Coppola',
        nationality: 'USA',
        image: 'image.test/coppola',
        birthday: '1939-04-07',
    };

    const response = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(newData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newData.name);
});

test("DELETE 'BASE_URL/:id' should return status code 204", async () => {
    const response = await request(app)
        .delete(`${BASE_URL}/${directorId}`);

    expect(response.status).toBe(204);
});