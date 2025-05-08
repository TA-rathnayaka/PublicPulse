// // module.exports = {
// //   testEnvironment: 'jsdom',
// //   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
// //   transform: {
// //     '^.+\\.(js|jsx)$': 'babel-jest'
// //   },
// //   moduleNameMapper: {
// //     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
// //   },
// //   // Remove testEnvironmentOptions if not needed
// //   // Or properly define it if you're using specific JSDOM options
// // };

// // module.exports = {
// //   testEnvironment: 'jsdom',
// //   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
// //   transform: {
// //     '^.+\\.(js|jsx)$': 'babel-jest',
// //   },
// //   moduleNameMapper: {
// //     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
// //   },
// // };

// // module.exports = {
// //   testEnvironment: 'jsdom',
// //   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
// //   transform: {
// //     '^.+\\.(js|jsx|mjs)$': 'babel-jest', // Added .mjs for completeness
// //   },
// //   moduleNameMapper: {
// //     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
// //   },
// //   transformIgnorePatterns: [
// //     '/node_modules/(?!(@testing-library)/)', // Transform @testing-library modules
// //   ],
// // };

// module.exports = {
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
//   transform: {
//     '^.+\\.(js|jsx|mjs)$': 'babel-jest', // Include .mjs for completeness
//   },
//   moduleNameMapper: {
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   transformIgnorePatterns: [
//     '/node_modules/(?!(@testing-library)/)', // Transform @testing-library modules
//   ],
// };

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
};