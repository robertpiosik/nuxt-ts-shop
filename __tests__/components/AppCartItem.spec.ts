import { mount } from '@vue/test-utils'

import AppCartItem from './../../src/components/AppCartItem.vue'

import { priceFormatter } from './../../src/utils/transformations'

const title = 'Water'
const price = 1.2
const thumbnail = 'someUrl'
const quantity = 2

const wrapper = mount(AppCartItem, {
  propsData: {
    title,
    price,
    thumbnail,
    quantity
  }
})

describe('Component: CartItem', () => {
  describe('GENERAL', () => {
    it('should match a snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy
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
      it('should NOT render in unformatted form', () => {
        expect(wrapper.text()).not.toContain(price)
      })
      it('should render in formatted form', () => {
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
      it('should output html containing given url', () => {
        expect(wrapper.html()).toContain(thumbnail)
      })
    })
    describe('quantity', () => {
      it('should receive', () => {
        expect(wrapper.props('quantity')).toBe(quantity)
      })
      it('should render', () => {
        expect(wrapper.text()).toContain(quantity)
      })
    })
  })
  describe('EVENTS', () => {
    describe('removeItem', () => {
      it('should emit upon clicking on div[remove]', () => {
        const removeBtn = wrapper.find('div[remove]')
        removeBtn.trigger('click')
        expect(wrapper.emitted('remove-item')).toBeTruthy()
      })
    })
    describe('increaseQuantity', () => {
      it('should emit upon clicking on buttton[increaseQuantity]', () => {
        const increaseQuantityButton = wrapper.find('button[increaseQuantity]')
        increaseQuantityButton.trigger('click')
        expect(wrapper.emitted('increase-quantity')).toBeTruthy()
      })
    })
    describe('decreaseQuantity', () => {
      it('should emit upon clicking on button[decreaseQuantity]', () => {
        const decreaseQuantityButton = wrapper.find('button[decreaseQuantity]')
        decreaseQuantityButton.trigger('click')
        expect(wrapper.emitted('decrease-quantity')).toBeTruthy()
      })
    })
  })
})
