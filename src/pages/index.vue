<template lang="pug">
	div(:class="$style.wrapper")
		div cart
		template(v-if="productsDataSortedByPrice !== null")
			ProductsGrid()
				ProductsGridItem(
					v-for="(product, index) in productsDataSortedByPrice"
					:key="index"
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
  get productsDataSortedByPrice() {
    return this.$accessor.products.productsDataSortedByPrice
	}
	
	get productsDataSortedByName() {
		return this.$accessor.products.productsDataSortedByName
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
