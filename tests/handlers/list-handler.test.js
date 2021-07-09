const path = require('path');
const request = require('supertest');
const app = require(path.resolve('tests/app'));

describe('List Handler', () => {
    test('should list the data-types', async () => {
        const { body, statusCode } = await request(app).get('/data-types');
        expect(body.count).toBe(100);
        expect(body.rows.length).toBe(25);
        expect(statusCode).toBe(200);
    });
});
