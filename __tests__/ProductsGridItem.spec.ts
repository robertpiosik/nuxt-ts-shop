import { mount } from '@vue/test-utils'
import ProductsGridItem from './../src/components/ProductsGridItem.vue'

const wrapper = mount(ProductsGridItem, {
  propsData: {
    title: 'Some title',
    price: 20.99,
    thumbnail: 'href'
  }
})

describe('ProductsGrid', () => {
  describe('GENERAL', () => {
    it('mounts', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
  describe('PROPS', () => {})
  describe('SLOTS', () => {})
})
