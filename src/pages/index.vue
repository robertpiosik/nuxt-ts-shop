<template lang="pug">
	main
		app-section(title="Cart")
			div cart
		app-section(title="Products")
			template(v-if="productsData !== null")
				br
				button(@click="sortProductsDataByNameAZ()") AZ
				button(@click="sortProductsDataByNameZA()") ZA
				button(@click="sortProductsDataByPriceAsc()") Price ASC
				button(@click="sortProductsDataByPriceDesc()") Price DESC
				br
				br
				ProductsGrid()
					ProductsGridItem(
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
import ProductsGrid from './../components/ProductsGrid.vue'
import ProductsGridItem from './../components/ProductsGridItem.vue'

@Component({ components: { AppSection, ProductsGrid, ProductsGridItem } })
export default class extends Vue {
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
