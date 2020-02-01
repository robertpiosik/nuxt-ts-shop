import { mount } from '@vue/test-utils'
import ProductsGridItem from './../src/components/ProductsGridItem.vue'

const wrapper = mount(ProductsGridItem)

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
