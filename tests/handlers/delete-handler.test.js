const path = require('path');
const qs = require('qs');
const request = require('supertest');
const moment = require('moment');
const { initDB, clearDB } = require(path.resolve('tests/test-utils/db'));

const createApp = require(path.resolve('tests/app'));

describe('Delete Handler', () => {
    beforeAll(() => {
        return initDB();
    });

    afterAll(() => {
        return clearDB();
    });

    const app = createApp({
        delete: {
            before: (req, model) => {
                if (req.params.id === '123456') {
                    throw new Error('Test error');
                }
            },
        },
    });

    const id = 7;

    test('should delete a data-type', async () => {
        const { body, statusCode } = await request(app).delete(`/data-types/${id}`);
        expect(statusCode).toBe(200);
        expect(typeof body.message).toBe('string');
        expect(body.item.id).toBe(id);
    });

    test('should return a 404 not found error', async () => {
        const id = 99999;
        const { body, statusCode } = await request(app).delete(`/data-types/${id}`);
        expect(typeof body.message).toBe('string');
        expect(statusCode).toBe(404);
    });

    test('should return an error', async () => {
        const { body, statusCode } = await request(app).delete('/data-types/123456');
        expect(typeof body.message).toBe('string');
        expect(typeof body.error).toBe('string');
        expect(statusCode).toBe(500);
    });
});
