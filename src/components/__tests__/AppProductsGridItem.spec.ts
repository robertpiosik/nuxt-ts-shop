import { mount } from '@vue/test-utils';
import AppProductsGridItem from './../AppProductsGridItem.vue';

import { priceFormatter } from './../../utils/transformations';

const title = 'Some title';
const price = 20.99;
const thumbnail = 'someUrl';

const wrapper = mount(AppProductsGridItem, {
  propsData: {
    title,
    price,
    thumbnail
  }
});

describe('Component: ProductsGrid', () => {
  describe('GENERAL', () => {
    it('should match a snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });
  describe('PROPS', () => {
    describe('title', () => {
      it('should receive', () => {
        expect(wrapper.props('title')).toBe(title);
      });
      it('should render', () => {
        expect(wrapper.text()).toContain(title);
      });
    });
    describe('price', () => {
      it('should receive', () => {
        expect(wrapper.props('price')).toBe(price);
      });
      it('should NOT render passed unformatted number', () => {
        expect(wrapper.text()).not.toContain(price);
      });
      it('should render formatted price', () => {
        const formattedPrice = priceFormatter(price);
        expect(wrapper.text()).toContain(
          formattedPrice.value + formattedPrice.penny
        );
      });
    });
    describe('thumbnail', () => {
      it('should receive', () => {
        expect(wrapper.props('thumbnail')).toBe(thumbnail);
      });
      it('should output html containing passed value', () => {
        expect(wrapper.html()).toContain(thumbnail);
      });
    });
  });
  describe('EVENTS', () => {
    describe('addToCart', () => {
      it('should emit by clicking on a button[addToCart]', () => {
        const button = wrapper.find('button[addToCart]');
        button.trigger('click');
        expect(wrapper.emitted('add-to-cart')).toBeTruthy();
      });
    });
  });
});
