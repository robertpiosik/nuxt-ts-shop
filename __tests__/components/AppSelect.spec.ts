import { mount } from '@vue/test-utils'

import AppSelect from './../../src/components/AppSelect.vue'

const label = 'Select option'

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' }
]

const wrapper = mount(AppSelect, {
  propsData: {
    label,
    options
  }
})

describe('Component: AppSelect', () => {
  describe('GENERAL', () => {
    it('should match a snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
})
