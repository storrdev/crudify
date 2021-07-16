'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DataType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.belongsToMany(models.Role, { through: 'UserRoles' });
            // this.belongsToMany(models.Organization, { through: 'UserOrganizations' });
            this.hasMany(models.Related);
        }

        // getRoles = () => {
        //     const roles = {};

        //     this.Roles.forEach(role => {
        //         if (!roles[role.name]) {
        //             roles[role.name] = [role.UserRoles.organizationId];
        //         } else {
        //             roles[role.name].push(role.UserRoles.organizationId);
        //         }
        //     });

        //     return roles;
        // }
    }
    DataType.init(
        {
            string: DataTypes.STRING,
            integer: DataTypes.INTEGER,
            float: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'DataType',
            paranoid: true,
        }
    );
    return DataType;
};
