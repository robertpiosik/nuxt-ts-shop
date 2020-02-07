<template lang="pug">
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
			app-products-grid()
				app-products-grid-item(
					v-for="product in productsData"
					:key="product.id"
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

import { priceFormatter } from './../../utils/transformations'

import AppSection from './../../components/AppSection.vue'
import AppProductsGrid from './../../components/AppProductsGrid.vue'
import AppProductsGridItem from './../../components/AppProductsGridItem.vue'

type SortingOptions =
  | ''
  | 'byNameAZ'
  | 'byNameZA'
  | 'byPriceAsc'
  | 'byPriceDesc'

@Component({
  components: {
    AppSection,
    AppProductsGrid,
    AppProductsGridItem
  }
})
export default class SectionProducts extends Vue {
  selectedSortingOption = ''

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
    document.documentElement.scrollTop = 0
  }
}
</script>
