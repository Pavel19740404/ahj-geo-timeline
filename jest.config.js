module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|html)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
