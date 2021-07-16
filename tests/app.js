const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const createCrudRoutes = require(path.resolve('src/index'));

const { DataType } = require(path.resolve('src/models'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    '/data-types',
    createCrudRoutes(DataType, {
        list: {
            before: (req, model) => {
                req.fake = 'fake data';
                model.fake = 'fake data';
            },
        },
    })
);

module.exports = app;