module.exports = {
    roots: ['<rootDir>/tests'],
    testRegex: '/tests/((?!\\.integration|e2e).)*\\.test.js$',
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    verbose: true,
};
