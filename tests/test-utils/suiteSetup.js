const models = require('../../src/models');

function closeCon() {
    models.sequelize.close();
}

afterAll(closeCon); // eslint-disable-line no-undef
