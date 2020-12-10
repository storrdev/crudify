const getByIdHandler = (model) => async (req, res) => {
  console.log("by id");
  const item = await model.findByPk(req.params.id);

  if (!item)
    return res.status(404).json({
      message: `Could not find ${model.name} with id: ${req.params.id}`,
    });

  res.json(item);
};

module.exports = getByIdHandler;
