const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  collectCoverage: true,
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^cross-storage$': '<rootDir>/__mocks__/cross-storage.js',
    '@/services/favorites/FavoriteService': '<rootDir>/test/unit/specs/services/favorites/__mocks__/FavoriteService.js',
    '@/ds/rest': '<rootDir>/test/unit/specs/ds/__mocks__/RestDS.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@nomock/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|PNG|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '.*\\.(ts)$': '<rootDir>/node_modules/ts-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vuex-i18n|@Yapo/altiro-i18n|@Yapo/altiro-components)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  coverageReporters: ['html', 'cobertura'],
  testResultsProcessor: './node_modules/jest-junit',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
};
