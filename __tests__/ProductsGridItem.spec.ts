import { mount } from '@vue/test-utils'
import ProductsGridItem from './../src/components/ProductsGridItem.vue'

import { priceFormatter } from './../src/utils/transformations'

const title = 'Some title'
const price = 20.99
const thumbnail = 'someUrl'

const wrapper = mount(ProductsGridItem, {
  propsData: {
    title,
    price,
    thumbnail
  }
})

describe('ProductsGrid', () => {
  describe('GENERAL', () => {
    it('should match a snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
  describe('PROPS', () => {
    describe('title', () => {
      it('should receive', () => {
        expect(wrapper.props('title')).toBe(title)
      })
      it('should render', () => {
        expect(wrapper.text()).toContain(title)
      })
    })
    describe('price', () => {
      it('should receive', () => {
        expect(wrapper.props('price')).toBe(price)
      })
      it('should NOT render passed unformatted number', () => {
        expect(wrapper.text()).not.toContain(price)
      })
      it('should render formatted price', () => {
        const formattedPrice = priceFormatter(price)
        expect(wrapper.text()).toContain(
          formattedPrice.value + formattedPrice.penny
        )
      })
    })
    describe('thumbnail', () => {
      it('should receive', () => {
        expect(wrapper.props('thumbnail')).toBe(thumbnail)
      })
      it('should output html containing passed value', () => {
        expect(wrapper.html()).toContain(thumbnail)
      })
    })
  })
  describe('EVENTS', () => {
    describe('addToCart', () => {
      it('should emit', () => {
        wrapper.vm.$emit('addToCart')
        expect(wrapper.emitted('addToCart')).toBeTruthy()
      })
      it('should emit by clicking on a button (there should be only one)', () => {
        const button = wrapper.find('button')
        button.trigger('click')
        expect(wrapper.emitted('addToCart')).toBeTruthy()
      })
    })
  })
})
