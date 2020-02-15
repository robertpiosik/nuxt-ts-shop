<template lang="pug">
	app-section(title="Cart")
		template(v-if="cartItemsAmount > 0")
			app-button(@click="toggleCart()") {{ isCartVisible ? `HIDE CART (${cartItemsAmount})` : `SHOW CART (${cartItemsAmount})` }}
			div(v-show="isCartVisible")
				app-cart-item(
					v-for="item in cartItems"
					:key="item.productId"
					v-if="productIndex(item.productId) !== -1"
					:title="productsData[productIndex(item.productId)].title"
					:price="productsData[productIndex(item.productId)].price"
					:thumbnail="productsData[productIndex(item.productId)].thumbnail"
					:quantity="item.quantity"
					@increase-quantity="increaseQuantity(item.productId)"
					@decrease-quantity="decreaseQuantity(item.productId)"
					@remove-item="removeItem(item.productId)"
				)
				div Cart total: #[strong {{ `${cartTotalPrice.value + cartTotalPrice.penny} zł` }}]
		template(v-if="productsData.length > 0 && cartItems.length === 0")
			div Your cart is empty.
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import { priceFormatter } from './../../utils/transformations';

import AppSection from './../../components/AppSection.vue';
import AppButton from './../../components/AppButton.vue';
import AppCartItem from './../../components/AppCartItem.vue';

@Component({
  components: { AppButton, AppSection, AppCartItem }
})
export default class SectionCart extends Vue {
  isCartVisible = true;

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  increaseQuantity(prodId: number) {
    this.$accessor.cart.increaseQuantity(prodId);
    this.$accessor.cart.preserveCartState();
  }

  decreaseQuantity(prodId: number) {
    this.$accessor.cart.decreaseQuantity(prodId);
    this.$accessor.cart.preserveCartState();
  }

  removeItem(prodId: number) {
    this.$accessor.cart.removeItem(prodId);
    this.$accessor.cart.preserveCartState();
  }

  get cartItems() {
    return this.$accessor.cart.cartItems;
  }

  @Watch('cartItems', { deep: true })
  onCartItemsChange() {
    this.isCartVisible = true;
  }

  get productsData() {
    return this.$accessor.products.productsData;
  }

  get cartTotalPrice() {
    let total = 0;
    this.cartItems.map(i => {
      const indexInProductsData = this.productsData.findIndex(
        p => p.id === i.productId
      );
      if (indexInProductsData !== -1) {
        total += i.quantity * this.productsData[indexInProductsData].price;
      }
    });
    return priceFormatter(total);
  }

  get cartItemsAmount() {
    let total = 0;
    this.cartItems.map(i => {
      const indexInProductsData = this.productsData.findIndex(
        p => p.id === i.productId
      );
      if (indexInProductsData !== -1) {
        total += 1;
      }
    });
    return total;
  }

  productIndex(id: number) {
    return this.productsData.findIndex(p => p.id === id);
  }
}
</script>
