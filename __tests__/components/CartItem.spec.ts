import { mount } from '@vue/test-utils'

import CartItem from './../src/components/CartItem.vue'

const wrapper = mount(CartItem)

describe('CartItem', () => {
  describe('GENERAL', () => {
    it('should be a Vue instance', () =>
      expect(wrapper.isVueInstance).toBeTruthy)
  })
})
