<template lang="pug">
	div(:class="$style.wrapper")
		div cart
		template(v-if="productsData !== null")
			button(@click="sortProductsDataByNameAZ()") AZ
			button(@click="sortProductsDataByNameZA()") ZA
			button(@click="sortProductsDataByPriceAsc()") Price ASC
			button(@click="sortProductsDataByPriceDesc()") Price DESC
			ProductsGrid()
				ProductsGridItem(
					v-for="(product, index) in productsData"
					:key="index"
					:id="product.id"
					:title="product.title"
					:price="product.price"
					:thumbnail="product.thumbnail"
				)
		template(v-else)
			div loading

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import ProductsGrid from './../components/ProductsGrid.vue'
import ProductsGridItem from './../components/ProductsGridItem.vue'

@Component({ components: { ProductsGrid, ProductsGridItem } })
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
