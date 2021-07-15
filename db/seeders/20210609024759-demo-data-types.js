'use strict';

const faker = require('faker');
const moment = require('moment');

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
            'DataTypes',
            [...Array(98).keys()]
                .map((_) => ({
                    string: faker.datatype.string(),
                    integer: faker.datatype.number(),
                    float: faker.datatype.float(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                }))
                .concat([
                    {
                        string: 'created-before-test-string',
                        integer: 123456789,
                        float: 1.23456789,
                        createdAt: moment().subtract(2, 'days').toDate(), // Old date for testing createdBefore/createdAfter
                        updatedAt: new Date(),
                        deletedAt: null,
                    },
                    {
                        string: 'updated-before-test-string',
                        integer: 1,
                        float: 1.1,
                        createdAt: moment().subtract(4, 'days').toDate(), // Old date for testing updatedBefore/updatedAfter
                        updatedAt: moment().subtract(3, 'days').toDate(),
                        deletedAt: null,
                    },
                ])
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('DataTypes', null, {});
    },
};
