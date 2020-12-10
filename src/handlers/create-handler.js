const createHandler = (model, options = {}) => async (req, res) => {
  if (options.before) options.before();
  res.json({
    message: `Your ${model.name} was created successfully`,
    item: await model.create(req.body),
  });
};

module.exports = createHandler;
