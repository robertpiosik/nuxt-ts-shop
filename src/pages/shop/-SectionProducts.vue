<template lang="pug">
	app-section(title="Products")

		template(v-if="productsData.length > 0")
			app-select(
				label="Sort products..."
				:options="sortingOptions"
				v-model="selectedSortingOption"
			)
			app-products-grid()
				app-products-grid-item(
					v-for="product in productsData"
					:key="product.id"
					:title="product.title"
					:price="product.price"
					:thumbnail="product.thumbnail"
					@add-to-cart="addToCart(product.id)"
				)

		template(v-else)
			div Fetching data...
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import { priceFormatter } from './../../utils/transformations'

import AppSection from './../../components/AppSection.vue'
import AppSelect from './../../components/AppSelect.vue'
import AppProductsGrid from './../../components/AppProductsGrid.vue'
import AppProductsGridItem from './../../components/AppProductsGridItem.vue'

@Component({
  components: {
    AppSection,
    AppSelect,
    AppProductsGrid,
    AppProductsGridItem
  }
})
export default class SectionProducts extends Vue {
  selectedSortingOption = ''
  sortingOptions = [
    {
      value: 'byNameAZ',
      label: 'Sort by name AZ'
    },
    {
      value: 'byNameZA',
      label: 'Sort by name ZA'
    },
    {
      value: 'byPriceAsc',
      label: 'Sort by price ASC'
    },
    {
      value: 'byPriceDesc',
      label: 'Sort by price DESC'
    }
  ]

  get productsData() {
    return this.$accessor.products.productsData
  }

  @Watch('selectedSortingOption')
  onSelectedSortingOptionChange(val: string) {
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

  mounted() {
    this.$accessor.products.getProductsData()
  }
}
</script>
