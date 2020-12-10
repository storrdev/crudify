# crudify

Quickly create express.js CRUD api endpoints using Sequelize.js models.

## Example

```
const createCrudRoutes = require('crudify');
const path = require("path");
const router = require("express").Router();

const { Resource } = require(path.resolve("models"));

router.use("/resources", createCrudRoutes(Resource));

module.exports = router;

```
