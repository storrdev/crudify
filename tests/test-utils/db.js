const Umzug = require('umzug');
const { sequelize, Sequelize } = require('../../src/models');

const migrations = new Umzug({
    migrations: {
        path: 'db/migrations',
        params: [sequelize.getQueryInterface(), Sequelize],
    },
    context: sequelize.getQueryInterface(),
    storage: 'sequelize',
    storageOptions: {
        sequelize,
    },
    logger: console,
});

const seeds = new Umzug({
    migrations: {
        path: 'db/seeders',
        params: [sequelize.getQueryInterface(), Sequelize],
    },
    context: sequelize.getQueryInterface(),
    storage: 'sequelize',
    storageOptions: {
        sequelize,
        modelName: 'seeder_meta',
    },
    logger: console,
});

async function initDB() {
    await migrations.up();
    await seeds.up();
}

async function clearDB() {
    await seeds.down({ to: 0 });
    await migrations.down({ to: 0 });
    sequelize.close();
}

module.exports = {
    initDB,
    clearDB,
};
