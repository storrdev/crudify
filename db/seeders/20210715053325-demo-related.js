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
            'Relateds',
            [...Array(98).keys()].map((_) => ({
                value: faker.datatype.string(),
                dataTypeId: faker.datatype.boolean()
                    ? faker.datatype.number({
                          min: 1,
                          max: 98,
                      })
                    : null,
                createdAt: new Date(),
                updatedAt: new Date(),
            })),
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('Relateds', null, {});
    },
};
