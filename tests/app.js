const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const createCrudRoutes = require(path.resolve('src/index'));

const { DataType } = require(path.resolve('src/models'));

function createApp(options = {}) {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(
        '/data-types',
        createCrudRoutes(DataType, options)
        // createCrudRoutes(DataType, {
        //     getById: {
        //         before: (req, model) => {
        //             if (req.params.id === '123456') {
        //                 throw new Error('Test error');
        //             }
        //         },
        //     },
        //     update: {
        //         middleware: (req, res, next) => {
        //             next();
        //         },
        //     },
        //     delete: {
        //         before: (req, model) => {
        //             if (req.params.id === '123456') {
        //                 throw new Error('Test error');
        //             }
        //         },
        //     },
        // })
    );

    return app;
}

module.exports = createApp;
