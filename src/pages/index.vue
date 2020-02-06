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
							:title="productsData[productIndex(item.productId)].title"
							:price="productsData[productIndex(item.productId)].price"
							:thumbnail="productsData[productIndex(item.productId)].thumbnail"
							:quantity="item.quantity"
							@increaseQuantity="increaseQuantity(item.productId)"
							@decreaseQuantity="decreaseQuantity(item.productId)"
						)
					div Cart total: #[strong {{ `${cartTotalPrice.value + cartTotalPrice.penny} zł` }}]
			template(v-if="productsData.length > 0 && cartItems.length === 0")
				div Your cart is empty.

		app-section(title="Products")
			template(v-if="productsData.length > 0")
				select(v-model="selectedSortingOption")
					option(disabled value="") Select sorting option
					option(value="byNameAZ") Sort by name AZ
					option(value="byNameZA") Sort by name ZA
					option(value="byPriceAsc") Sort by price ASC
					option(value="byPriceDesc") Sort by price DESC
				br
				br
				products-grid()
					products-grid-item(
						v-for="(product, index) in productsData"
						:key="index"
						:title="product.title"
						:price="product.price"
						:thumbnail="product.thumbnail"
						@addToCart="addToCart(product.id)"
					)
			template(v-else)
				div Fetching data...
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import { priceFormatter } from './../utils/transformations'

import AppSection from './../components/AppSection.vue'
import AppButton from './../components/AppButton.vue'
import CartItem from './../components/CartItem.vue'
import ProductsGrid from './../components/ProductsGrid.vue'
import ProductsGridItem from './../components/ProductsGridItem.vue'

type SortingOptions =
  | ''
  | 'byNameAZ'
  | 'byNameZA'
  | 'byPriceAsc'
  | 'byPriceDesc'

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
  selectedSortingOption = ''

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
    return total
  }

  get productsData() {
    return this.$accessor.products.productsData
  }

  @Watch('selectedSortingOption')
  onSelectedSortingOptionChange(val: SortingOptions, oldVal: string) {
    if (val === 'byNameAZ') {
      this.$accessor.products.sortProductsDataByNameAZ()
    } else if (val === 'byNameZA') {
      this.$accessor.products.sortProductsDataByNameZA()
    } else if (val === 'byPriceAsc') {
      this.$accessor.products.sortProductsDataByPriceAsc()
    } else if (val === 'byPriceDesc') {
      this.$accessor.products.sortProductsDataByPriceDesc()
    }
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
