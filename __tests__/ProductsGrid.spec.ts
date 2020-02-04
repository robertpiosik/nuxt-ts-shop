import { mount } from '@vue/test-utils'
import ProductsGrid from './../src/components/ProductsGrid.vue'

const slotContent = 'slot content'

const wrapper = mount(ProductsGrid, {
  slots: { default: slotContent }
})

describe('ProductsGrid', () => {
  describe('GENERAL', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
  describe('SLOTS', () => {
    it('should render given slot value and nothing else', () => {
      expect(wrapper.text()).toBe(slotContent)
    })
  })
})
