const updateHandler =
    (model, options = {}) =>
    async (req, res) => {
        let transaction = null;

        try {
            // if (options.transaction) {
            transaction = await model.sequelize.transaction();
            // }
            if (options.before) options.before(req, model, transaction);

            const original = await model.findByPk(req.params.id);

            Object.keys(req.body).forEach((key) => {
                const value = req.body[key];

                original[key] = value;
            });

            const item = await original.save({ transaction });

            if (options.afterUpdate) options.afterUpdate(item, transaction);

            if (transaction) transaction.commit();

            if (options.afterCommit) options.afterCommit(item, res);

            res.json({
                message: `Your ${model.name} was updated successfully`,
                item,
            });
        } catch (error) {
            if (options.onError) options.onError(res, error, transaction);

            if (transaction) await transaction.rollback();

            let message = error.message;

            // if (Array.isArray(error.errors)) {
            //     message = error.errors[0].message;
            // }

            res.status(500).json({
                message: options.errorMessage || `There was a problem updating your ${model.name}`,
                error: message,
            });
        }
    };

module.exports = updateHandler;
