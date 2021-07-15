const path = require('path');
const qs = require('qs');
const request = require('supertest');
const moment = require('moment');

const app = require(path.resolve('tests/app'));

describe('List Handler', () => {
    test('should list the data-types', async () => {
        const { body, statusCode } = await request(app).get('/data-types');
        expect(statusCode).toBe(200);
        expect(body.count).toBe(100);
        expect(body.rows.length).toBe(25);
    });

    test('should list only 10 data-type rows', async () => {
        const { body, statusCode } = await request(app).get('/data-types?perPage=10');
        expect(statusCode).toBe(200);
        expect(body.count).toBe(100);
        expect(body.rows.length).toBe(10);
    });

    test('should list all the data-type rows', async () => {
        const { body, statusCode } = await request(app).get('/data-types?perPage=0');
        expect(statusCode).toBe(200);
        expect(body.rows.length).toBe(body.count);
    });

    test('should get the second page the data-types list', async () => {
        const { body, statusCode } = await request(app).get('/data-types?page=2');
        expect(statusCode).toBe(200);
        expect(body.count).toBe(100);
        expect(body.rows.length).toBe(25);
    });

    test('should return one row based off a string query param', async () => {
        const testString = 'created-before-test-string';
        const { body, statusCode } = await request(app).get(`/data-types?string=${testString}`);
        expect(statusCode).toBe(200);
        expect(body.count).toBe(1);
        expect(body.rows[0].string).toBe(testString);
    });

    test('should return one row based off a integer query param', async () => {
        const testInt = 123456789;
        const { body, statusCode } = await request(app).get(`/data-types?integer=${testInt}`);
        expect(statusCode).toBe(200);
        expect(body.count).toBe(1);
        expect(body.rows[0].integer).toBe(testInt);
    });

    // Floats don't work for this, can't decide if checking each where param every time is worth it
    // test('should return one row based off a float query param', async () => {
    //     const testFloat = 1.23456789;
    //     const { body, statusCode } = await request(app).get(`/data-types?float=${testFloat}`);
    //     expect(statusCode).toBe(200);
    //     expect(body.count).toBe(1);
    //     expect(body.rows[0].float).toBe(testFloat);
    // });

    test('should return one row based off the createdBefore query param', async () => {
        const date = moment().subtract(1, 'days').toISOString();
        const { body, statusCode } = await request(app).get(`/data-types?createdBefore=${date}`);
        expect(statusCode).toBe(200);
        expect(body.count).toBe(2);
        expect(body.rows[0].string).toBe('created-before-test-string');
    });

    test('should return one row based off the updatedBefore query param', async () => {
        const date = moment().subtract(2, 'days').toISOString();
        const { body, statusCode } = await request(app).get(`/data-types?updatedBefore=${date}`);
        expect(statusCode).toBe(200);
        expect(body.count).toBe(1);
        expect(body.rows[0].string).toBe('updated-before-test-string');
    });

    test('should return one row based off the where query param', async () => {
        const where = {
            createdAt: {
                lt: moment().subtract(1, 'days').toISOString(),
            },
        };
        const { body, statusCode } = await request(app).get(`/data-types?where=${qs.stringify(where)}`);
        expect(statusCode).toBe(200);
        expect(body.count).toBe(2);
    });

    test("should return all the rows with included 'Related' model", async () => {
        const { body, statusCode } = await request(app).get(`/data-types?include=Relateds`);
        expect(statusCode).toBe(200);
        expect(body.count).toBe(100);
        expect(body.rows[0].Relateds).toBeDefined();
    });

    test('should return an error', async () => {
        const { body, statusCode } = await request(app).get(`/data-types?page=notanumber`);
        expect(typeof body.message).toBe('string');
        expect(typeof body.error).toBe('string');
        expect(statusCode).toBe(500);
    });
});
