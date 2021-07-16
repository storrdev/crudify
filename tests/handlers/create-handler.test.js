const path = require('path');
const qs = require('qs');
const request = require('supertest');
const moment = require('moment');
const { initDB, clearDB } = require(path.resolve('tests/test-utils/db'));

const createApp = require(path.resolve('tests/app'));

describe('Create Handler', () => {
    beforeAll(() => {
        return initDB();
    });

    afterAll(() => {
        return clearDB();
    });

    const app = createApp();

    const string = 'create-test-string';
    const integer = '22';
    const float = 2.22;

    test('should create a data-type', async () => {
        const { body, statusCode } = await request(app).post('/data-types').send({
            string,
            integer,
            float,
        });
        expect(statusCode).toBe(200);
        expect(typeof body.message).toBe('string');
        expect(typeof body.item.id).toBe('number');
        expect(body.item.string).toBe(string);
        expect(body.item.integer).toBe(integer);
        expect(body.item.float).toBe(float);
    });

    test('should return an error', async () => {
        const { body, statusCode } = await request(app).post('/data-types').send({
            string,
            integer: 'NaN',
            float,
        });
        expect(typeof body.message).toBe('string');
        expect(typeof body.error).toBe('string');
        expect(statusCode).toBe(500);
    });
});
