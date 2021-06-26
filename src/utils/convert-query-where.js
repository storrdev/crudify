const { Op } = require("sequelize");

const convertQueryWhere = (object) => {
  return Array.isArray(object)
    ? object.map(convertQueryWhere)
    : object && typeof object === "object"
    ? Object.fromEntries(
        Object.entries(object).map(([k, v]) => [
          k in Op ? Op[k] : k,
          convertQueryWhere(v),
        ])
      )
    : object;
};

module.exports = convertQueryWhere;
