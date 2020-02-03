<template lang="pug">
	div(:class="$style.container")
		div {{ id }}
		div {{ quantity }}
		div {{ price }}
		div {{ total }}
		br
		br
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ type: Number, required: true }) readonly id!: number
  @Prop({ type: Number, required: true }) readonly quantity!: number
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: Number, required: true }) readonly price!: number
  @Prop({ type: String, required: true }) readonly thumbnail!: string

  get total() {
    return this.price * this.quantity
  }

  // created() {
  //   const { title, price, thumbnail } = this.$accessor.products.productsData[
  //     this.productIndex
  //   ]
  //   this.price = price
  //   this.thumbnail = thumbnail
  // }
}
</script>

<style lang="scss" module>
.container {
}
</style>
