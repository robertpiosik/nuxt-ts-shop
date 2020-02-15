<template lang="pug">
	main
		template(v-if="productsData.length > 0")
			section-cart
			section-products
		template(v-else)
			fetching-data
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SectionCart from './-SectionCart.vue';
import SectionProducts from './-SectionProducts.vue';
import FetchingData from './-FetchingData.vue';

@Component({
  components: {
    SectionCart,
    SectionProducts,
    FetchingData
  }
})
export default class PageIndex extends Vue {
  get productsData() {
    return this.$accessor.products.productsData;
  }

  mounted() {
    this.$accessor.products.getProductsData();
    this.$accessor.cart.loadCartState();
  }
}
</script>
