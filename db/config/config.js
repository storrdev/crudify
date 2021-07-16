const env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.development';
require('dotenv').config({ path: env });

module.exports = {
    username: process.env.CI_DB_USERNAME || 'test_user', // Docker compose username
    password: process.env.CI_DB_PASSWORD || 'example', // Docker compose password
    database: process.env.CI_DB_NAME || 'database_test', // Docker compose database
    host: process.env.CI_DB_HOST || '127.0.0.1',
    port: process.env.CI_DB_PORT || 18749, // Docker compose port
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        bigNumberStrings: true,
    },
};
