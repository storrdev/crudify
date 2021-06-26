const qs = require("qs");
const { Op } = require("sequelize");

const convertQueryWhere = require("../utils/convert-query-where");

const listHandler = (model, options = {}) => async (req, res) => {
  try {
    if (options.before) options.before(req, model);

    const params = {
      limit: 25,
      where: {},
    };

    const { query } = req;

    if (!query.where) {
      if (query.perPage) params.limit = parseInt(query.perPage);
      if (query.page) params.offset = params.limit * parseInt(query.page - 1);

      // look for model attributes in the params
      const columns = await model.describe();

      // delete columns that wont be available to search through the req.query properties
      delete columns.id;
      delete columns.createdAt;
      delete columns.updatedAt;
      delete columns.deletedAt;

      // Add req.query properties that are allowed on the where object
      Object.keys(columns).forEach((column) => {
        if (typeof query[column] !== "undefined") {
          params.where[column] = query[column];
        }
      });

      // Check for special req.query params
      const {
        createdBefore,
        createdAfter,
        deletedBefore,
        deletedAfter,
        updatedBefore,
        updatedAfter,
      } = req.query;

      if (createdBefore || createdAfter) {
        params.where.createdAt = {};
        if (createdBefore) params.where.createdAt[Op.lt] = createdBefore;
        if (createdAfter) params.where.createdAt[Op.gt] = createdAfter;
      }

      if (deletedBefore || deletedAfter) {
        params.where.deletedAt = {};
        if (deletedBefore) params.where.deletedAt[Op.lt] = deletedBefore;
        if (deletedAfter) params.where.deletedAt[Op.gt] = deletedAfter;
      }

      if (updatedBefore || updatedAfter) {
        params.where.updatedAt = {};
        if (updatedBefore) params.where.updatedAt[Op.lt] = updatedBefore;
        if (updatedAfter) params.where.updatedAt[Op.gt] = updatedAfter;
      }
    } else {
      const parsed = qs.parse(query.where);

      params.where = convertQueryWhere(parsed);
    }

    const items = await model.findAll(params);

    if (options.after) options.after(items, res);

    res.json(items);
  } catch (error) {
    console.log(error);

    if (options.onError) options.onError(res, error);

    res.status(500).json({
      message:
        options.errorMessage ||
        `There was a problem retrieving the requested ${model.name}`,
      error: error.message,
    });
  }
};

module.exports = listHandler;
