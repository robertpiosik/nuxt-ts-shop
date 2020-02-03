<template lang="pug">
	main
		app-section(title="Cart")
			div(
				v-for="(item, index) in cartItems"
				:key="index"
			)
				template(v-if="productIndex(item.productId) !== -1")
					cart-item(
						:id="item.productId"
						:quantity="item.quantity"
						:productIndex="productIndex(item.productId)"
					)
		app-section(title="Products")
			template(v-if="productsData !== null")
				br
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
				div loading

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import AppSection from './../components/AppSection.vue'
import CartItem from './../components/CartItem.vue'
import ProductsGrid from './../components/ProductsGrid.vue'
import ProductsGridItem from './../components/ProductsGridItem.vue'

@Component({
  components: { AppSection, CartItem, ProductsGrid, ProductsGridItem }
})
export default class extends Vue {
  get cartItems() {
    return this.$accessor.cart.cartItems
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
  }

  productIndex(id: number) {
    return this.productsData.findIndex(p => p.id === id)
  }

  mounted() {
    this.$accessor.products.getProductsData()
  }
}
</script>

<style lang="scss" module>
.wrapper {
  @include wrapper;
}
</style>
