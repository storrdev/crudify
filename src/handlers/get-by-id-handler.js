const getByIdHandler = (model, options = {}) => async (req, res) => {
  try {
    if (options.before) options.before(req, model);

    let item = await model.findByPk(req.params.id);

    if (!item)
      return res.status(404).json({
        message: `Could not find ${model.name} with id: ${req.params.id}`,
      });

    let afterItem;

    if (options.after) afterItem = options.after(item, res);

    if (afterItem) item = afterItem;

    res.json(item);
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

module.exports = getByIdHandler;
