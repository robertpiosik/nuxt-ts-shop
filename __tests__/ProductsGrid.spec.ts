import { mount } from '@vue/test-utils'
import ProductsGrid from './../src/components/ProductsGrid.vue'

const wrapper = mount(ProductsGrid)

describe('ProductsGrid', () => {
  describe('GENERAL', () => {
    it('mounts', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
  describe('PROPS', () => {
  })
  describe('SLOTS', () => {
  })
})
