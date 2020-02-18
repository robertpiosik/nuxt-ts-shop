module.exports = {
  testMatch: ['<rootDir>/**/__tests__/**/*.spec.ts'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'vue-jest': {
      resources: {
        scss: [
          './src/assets/scss/mixins.scss',
          './src/assets/scss/variables.scss'
        ]
      }
    }
  }
};
