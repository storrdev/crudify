const path = require('path');
const express = require('express');
const app = express();
const port = 4234;

const createCrudRoutes = require(path.resolve('src/index'));

const { DataType } = require(path.resolve('src/models'));

app.use('/data-types', createCrudRoutes(DataType));

app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
