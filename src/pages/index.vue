<template lang="pug">
	div(:class="$style.wrapper")
		div cart
		template(v-if="productsData !== null")
			ProductsGrid()
				ProductsGridItem(
					v-for="(product, index) in productsData"
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
  get productsData() {
    return this.$accessor.products.productsData
  }

  mounted() {
    this.$accessor.products.getProducts()
  }
}
</script>

<style lang="scss" module>
.wrapper {
  @include wrapper;
}
</style>
