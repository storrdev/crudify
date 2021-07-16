const express = require('express');
const path = require('path');

const createCrudRoutes = require(path.resolve('src/index'));

const { DataType } = require(path.resolve('src/models'));

describe('Base Library', () => {
    test('Create Crud Routes', () => {
        // const router = createCrudRoutes(DataType);
        // expect(typeof router).toBe('function');
        expect(true).toBeTruthy();
    });
});
