module.exports = {
  verbose: true,
  bail: true,
  moduleFileExtensions: ['js', 'vue', 'json'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1'
  }
}
