'use strict';

const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'DataType',
            [...Array(100).keys()].map((_) => ({
                string: faker.datatype.string(),
                integer: faker.datatype.number(),
                float: faker.datatype.float(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('DataType', null, {});
    },
};
