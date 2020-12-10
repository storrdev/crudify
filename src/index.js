const createHandler = require("./handlers/create-handler");
const deleteHandler = require("./handlers/delete-handler");
const errorHandler = require("./handlers/error-handler");
const getByIdHandler = require("./handlers/get-by-id-handler");
const listHandler = require("./handlers/list-handler");
const updateHandler = require("./handlers/update-handler");

const createCrudRoutes = (model, options = {}) => {
  // Important that this is created INSIDE this function
  const router = require("express").Router();

  // Create
  router.post(
    "/",
    errorHandler(
      createHandler(model, options.create),
      `There was a problem creating your ${model.name}`
    )
  );

  // List
  router.get(
    "/",
    errorHandler(
      listHandler(model),
      `There was a problem retrieving the requested ${model.name}`
    )
  );

  // Get By ID
  router.get(
    "/:id",
    errorHandler(
      getByIdHandler(model),
      `There was a problem retrieving the requested ${model.name}`
    )
  );

  // Update
  router.patch(
    "/:id",
    errorHandler(
      updateHandler(model),
      `There was a problem updating your ${model.name}`
    )
  );

  // Delete
  router.delete(
    "/:id",
    errorHandler(
      deleteHandler(model),
      `There was a problem deleting your ${model.name}`
    )
  );

  return router;
};

module.exports = createCrudRoutes;
