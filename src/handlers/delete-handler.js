const deleteHandler = (model) => async (req, res) => {
  const item = await model.findByPk(req.params.id);

  await item.destroy();

  res.json({ message: `Your ${model.name} was deleted successfully`, item });
};

module.exports = deleteHandler;
