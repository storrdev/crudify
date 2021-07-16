const path = require('path');
const qs = require('qs');
const request = require('supertest');
const moment = require('moment');
const { initDB, clearDB } = require(path.resolve('tests/test-utils/db'));

const createApp = require(path.resolve('tests/app'));

describe('Update Handler', () => {
    beforeAll(() => {
        return initDB();
    });

    afterAll(() => {
        return clearDB();
    });

    const id = 9;
    const string = 'update-test-string';

    test('should update a data-type', async () => {
        const app = createApp();
        const integer = 777;
        const float = 7.77;
        const { body, statusCode } = await request(app).patch(`/data-types/${id}`).send({
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
        const app = createApp({
            update: {
                middleware: (req, res, next) => {
                    next();
                },
            },
        });
        const integer = 'NaN';
        const float = 'NaN';
        const { body, statusCode } = await request(app).patch(`/data-types/${id}`).send({
            string,
            integer,
            float,
        });
        expect(typeof body.message).toBe('string');
        expect(typeof body.error).toBe('string');
        expect(statusCode).toBe(500);
    });
});
