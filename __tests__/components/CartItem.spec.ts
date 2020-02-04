import { mount } from '@vue/test-utils'

import CartItem from './../../src/components/CartItem.vue'

import { priceFormatter } from './../../src/utils/transformations'

const title = 'Water'
const price = 1.2
const thumbnail = 'someUrl'
const quantity = 2

const wrapper = mount(CartItem, {
  propsData: {
    title,
    price,
    thumbnail,
    quantity
  }
})

describe('CartItem', () => {
  describe('GENERAL', () => {
    it('should match a snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy
    })
  }),
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
				// TODO tests for increasing/decreasing quantity and total price
      })
    })
})
