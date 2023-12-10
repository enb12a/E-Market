module.exports = {
  // ...
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-dom)/)',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native/index',
  },
};