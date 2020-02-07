module.exports = {
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
  snapshotSerializers: ['jest-serializer-vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest'
  },
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
}
