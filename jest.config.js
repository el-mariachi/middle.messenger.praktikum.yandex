/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/svalka/', '/.*\\.d\\.ts$'],
  moduleNameMapper: {
    '\\.scss$': require.resolve('./test-utils/style-mock.ts'),
  },
  transform: {
    '\\.hbs$': './node_modules/handlebars-jest',
  },
  setupFilesAfterEnv: ['./test-utils/setup-jest.ts'],
};

module.exports = config;
