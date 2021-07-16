require('dotenv').config({ path: '.env.test' });

module.exports = {
    collectCoverage: true,
    coveragePathIgnorePatterns: ['/node_modules/', '/src/models/index.js', '/db/', '/tests/', '/src/aws/index.js'],
    // globalSetup: './tests/test-utils/setup.js',
    // globalTeardown: './tests/test-utils/teardown.js',
    setupFilesAfterEnv: ['./tests/test-utils/suiteSetup.js'],
};
