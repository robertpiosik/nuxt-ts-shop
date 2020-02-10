import { mount } from '@vue/test-utils'
import AppButton from './../AppButton.vue'

const wrapper = mount(AppButton)

describe('Component: AppButton', () => {
  describe('GENERAL', () => {
    it('should match a snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
})
