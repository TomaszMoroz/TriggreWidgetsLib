module.exports = {
  testEnvironment: 'jsdom', // Set the test environment to jsdom
  transform: {
      "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    '^dompurify$': '<rootDir>/node_modules/dompurify/dist/purify.min.js',
},
};