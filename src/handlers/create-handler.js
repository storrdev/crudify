const createHandler =
    (model, options = {}) =>
    async (req, res) => {
        let transaction = null;

        try {
            // if (options.createTransaction) {
            //   transaction = await model.sequelize.transaction();
            // }
            // if (options.beforeCreate) req = options.beforeCreate(req, model, transaction);

            const item = await model.create(req.body, { transaction });

            // if (model.associations) {
            //     Object.keys(model.associations).forEach((key) => {
            //         const association = model.associations[key];
            //         // console.log('source', association.source);
            //         // console.log('target', association.target);
            //         // console.log(association.associationType);

            //         // console.log(Object.keys(association));

            //         // TODO: Look into association handling
            //         // if (association.associationType === 'BelongsToMany') {
            //         //     const bodyKey = `${association.target}Id`;
            //         //     const addMethod = `add${association.target}`;

            //         //     if (req.body[bodyKey]) {
            //         //         item[addMethod](req.body[bodyKey]);
            //         //     }
            //         // }
            //     });
            // }

            if (options.afterCreate) options.afterCreate(item, req, transaction);

            // if (transaction) await transaction.commit();

            // if (model.afterCreateTransaction)
            //   model.afterafterCreateTransactionTransaction(item, res);

            res.json({
                message: `Your ${model.name} was created successfully`,
                item,
            });
        } catch (error) {
            if (model.onError) model.onError(res, error, transaction);

            // if (transaction) await transaction.rollback();

            // console.log(error);
            res.status(500).json({
                message: model.errorMessage || `There was a problem creating your ${model.name}`,
                error: error.message,
            });
        }
    };

module.exports = createHandler;
