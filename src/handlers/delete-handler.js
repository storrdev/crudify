const deleteHandler =
    (model, options = {}) =>
    async (req, res) => {
        let transaction = null;

        try {
            // if (options.transaction) {
            // transaction = await model.sequelize.transaction();
            // }
            if (options.before) options.before(req, model, transaction);

            const item = await model.findByPk(req.params.id);

            if (!item) {
                res.status(404).json({ message: `Could not find ${model.name} with id: ${req.params.id}` });
                return;
            }

            await item.destroy({ transaction });

            if (options.afterDelete) options.afterDelete(item, transaction);

            // await transaction.commit();

            // if (options.afterCommit) options.afterCommit(item, res);

            res.json({ message: `Your ${model.name} was deleted successfully`, item });
        } catch (error) {
            if (options.onError) options.onError(res, error, transaction);

            // if (transaction) await transaction.rollback();

            // console.log(error);
            res.status(500).json({
                message: options.errorMessage || `There was a problem deleting your ${model.name}`,
                error: error.message,
            });
        }
    };

module.exports = deleteHandler;
