const createHandler = require("./handlers/create-handler");
const deleteHandler = require("./handlers/delete-handler");
const getByIdHandler = require("./handlers/get-by-id-handler");
const listHandler = require("./handlers/list-handler");
const updateHandler = require("./handlers/update-handler");

const createCrudRoutes = (model, options = {}) => {
  // Important that this is created INSIDE this function
  const router = require("express").Router();

  // Create
  router.post("/", createHandler(model, options.create));

  // List
  router.get("/", listHandler(model, options.list));

  // Get By ID
  router.get("/:id", getByIdHandler(model, options.getById));

  // Update
  if (options?.update?.middleware) {
    router.patch("/:id", options.update.middleware, updateHandler(model, options.update));
  } else {
    router.patch("/:id", updateHandler(model, options.update));
  }

  // Delete
  router.delete("/:id", deleteHandler(model, options.delete));

  return router;
};

module.exports = createCrudRoutes;
