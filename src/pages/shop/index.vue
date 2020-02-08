<template lang="pug">
	main
		section-cart
		section-products
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import SectionCart from './-SectionCart.vue'
import SectionProducts from './-SectionProducts.vue'

@Component({
  components: {
    SectionCart,
    SectionProducts
  }
})
export default class PageIndex extends Vue {
}
</script>
