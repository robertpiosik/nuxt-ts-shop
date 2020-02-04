import { priceFormatter } from '../../src/utils/transformations'

describe('Utils: transformations', () => {
  describe('priceFormatter', () => {
    it('should correctly transform 10 (number)', () => {
      expect(priceFormatter(10)).toMatchObject({ value: '10', penny: ',00' })
    })
    it('should transform 10.99 (number)', () => {
      expect(priceFormatter(10.99)).toMatchObject({ value: '10', penny: ',99' })
    })
  })
})
