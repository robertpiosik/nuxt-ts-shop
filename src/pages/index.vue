<template lang="pug">
	main

		app-section(title="Cart" v-if="productsData.length > 0")
			template(v-if="cartItemsAmount > 0")
				app-button(@click="toggleCart()") {{ isCartVisible ? `HIDE CART (${cartItemsAmount})` : `SHOW CART (${cartItemsAmount})` }}
				div(v-show="isCartVisible")
					div(
						v-for="(item, index) in cartItems"
						:key="index"
					)
						cart-item(
							v-if="productIndex(item.productId) !== -1"
							:id="item.productId"
							:quantity="item.quantity"
							:title="productsData[productIndex(item.productId)].title"
							:price="productsData[productIndex(item.productId)].price"
							:thumbnail="productsData[productIndex(item.productId)].thumbnail"
							@increaseQuantity="increaseQuantity(item.productId)"
							@decreaseQuantity="decreaseQuantity(item.productId)"
						)
					div #[strong Cart total:] {{ `${cartTotalPrice.value + cartTotalPrice.penny} zł` }}
			template(v-if="productsData.length > 0 && cartItems.length === 0")
				div Your cart is empty.

		app-section(title="Products")
			template(v-if="productsData.length > 0")
				button(@click="sortProductsDataByNameAZ()") AZ
				button(@click="sortProductsDataByNameZA()") ZA
				button(@click="sortProductsDataByPriceAsc()") Price ASC
				button(@click="sortProductsDataByPriceDesc()") Price DESC
				br
				br
				products-grid()
					products-grid-item(
						v-for="(product, index) in productsData"
						:key="index"
						:id="product.id"
						:title="product.title"
						:price="product.price"
						:thumbnail="product.thumbnail"
						@addToCart="addToCart(product.id)"
					)
			template(v-else)
				div Loading...
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { priceFormatter } from './../utils/transformations'

import AppSection from './../components/AppSection.vue'
import AppButton from './../components/AppButton.vue'
import CartItem from './../components/CartItem.vue'
import ProductsGrid from './../components/ProductsGrid.vue'
import ProductsGridItem from './../components/ProductsGridItem.vue'

@Component({
  components: {
    AppSection,
    AppButton,
    CartItem,
    ProductsGrid,
    ProductsGridItem
  }
})
export default class PageIndex extends Vue {
  isCartVisible = false

  toggleCart() {
    this.isCartVisible = !this.isCartVisible
  }

  increaseQuantity(prodId: number) {
    this.$accessor.cart.increaseQuantity(prodId)
    this.$accessor.cart.preserveCartState()
  }

  decreaseQuantity(prodId: number) {
    this.$accessor.cart.decreaseQuantity(prodId)
    this.$accessor.cart.preserveCartState()
  }

  get cartItems() {
    return this.$accessor.cart.cartItems
  }

  get cartTotalPrice() {
    let total = 0
    this.cartItems.map(i => {
      const indexInProductsData = this.productsData.findIndex(
        p => p.id === i.productId
      )
      if (indexInProductsData !== -1) {
        total += i.quantity * this.productsData[indexInProductsData].price
      }
    })
    return priceFormatter(total)
  }

  get cartItemsAmount() {
    let total = 0
    this.cartItems.map(i => {
      const indexInProductsData = this.productsData.findIndex(
        p => p.id === i.productId
      )
      if (indexInProductsData !== -1) {
        total += 1
      }
		})
		return total;
  }

  get productsData() {
    return this.$accessor.products.productsData
  }

  sortProductsDataByPriceAsc() {
    this.$accessor.products.sortProductsDataByPriceAsc()
  }
  sortProductsDataByPriceDesc() {
    this.$accessor.products.sortProductsDataByPriceDesc()
  }
  sortProductsDataByNameAZ() {
    this.$accessor.products.sortProductsDataByNameAZ()
  }
  sortProductsDataByNameZA() {
    this.$accessor.products.sortProductsDataByNameZA()
  }

  addToCart(prodId: number) {
    this.$accessor.cart.addToCart(prodId)
    this.$accessor.cart.preserveCartState()
    this.isCartVisible = true
    document.documentElement.scrollTop = 0
  }

  productIndex(id: number) {
    return this.productsData.findIndex(p => p.id === id)
  }

  mounted() {
    this.$accessor.products.getProductsData()
    this.$accessor.cart.loadCartState()
  }
}
</script>
