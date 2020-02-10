import { priceFormatter } from '../transformations'

describe('Utils: transformations', () => {
  describe('priceFormatter', () => {
    it('should correctly transform 10', () => {
      expect(priceFormatter(10)).toMatchObject({ value: '10', penny: ',00' })
    })
    it('should correctly transform 10.99', () => {
      expect(priceFormatter(10.99)).toMatchObject({ value: '10', penny: ',99' })
    })
    it('should correctly transform 10.9', () => {
      expect(priceFormatter(10.9)).toMatchObject({ value: '10', penny: ',90' })
    })
    it('should correctly transform 10.00001', () => {
      expect(priceFormatter(10.00001)).toMatchObject({
        value: '10',
        penny: ',00'
      })
    })
  })
})
