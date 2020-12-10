const updateHandler = (model) => async (req, res) => {
  const original = await model.findByPk(req.params.id);

  Object.keys(req.body).forEach((key) => {
    const value = req.body[key];

    original[key] = value;
  });

  res.json({
    message: `Your ${model.name} was updated successfully`,
    item: await original.save(),
  });
};

module.exports = updateHandler;
