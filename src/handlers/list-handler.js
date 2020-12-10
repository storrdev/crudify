const listHandler = (model, perPage = 2) => async (req, res) => {
  console.log("list");
  const options = {
    limit: perPage,
  };

  const { query } = req;

  if (query.perPage) options.limit = parseInt(query.perPage);
  if (query.page) options.offset = options.limit * parseInt(query.page - 1);

  res.json(await model.findAll(options));
};

module.exports = listHandler;
