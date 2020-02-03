<template lang="pug">
	div(:class="$style.container")
		div(:class="$style.thumbnail")
			img(:src="thumbnail")
		div(:class="$style.title") {{ title }}
		div(:class="$style.quantity") {{ quantity }}
		div(:class="$style.priceAndTotal")
			div(:class="$style.price")
				span(:class="$style.priceValue") {{ priceFormatted.value }}
				span(:class="$style.pricePenny") {{ priceFormatted.penny }}
			div(:class="$style.total")
				span(:class="$style.priceValue") {{ totalFormatted.value }}
				span(:class="$style.pricePenny") {{ totalFormatted.penny }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { priceFormatter } from './../utils/transformations'

@Component
export default class CartItem extends Vue {
  @Prop({ type: Number, required: true }) readonly id!: number
  @Prop({ type: Number, required: true }) readonly quantity!: number
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: Number, required: true }) readonly price!: number
  @Prop({ type: String, required: true }) readonly thumbnail!: string

  get totalFormatted() {
    return priceFormatter(this.price * this.quantity)
  }
  get priceFormatted() {
    return priceFormatter(this.price)
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  @include atSmall {
    flex-direction: row;
  }
}
.thumbnail {
  position: relative;
  @include toExtraSmall {
    width: 7rem;
    height: 7rem;
  }
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  @include atSmall {
    width: 10rem;
    height: 10rem;
  }
  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
}
.title {
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  width: 20rem;
}
.quantity {
  display: flex;
  width: 10rem;
}
.priceAndTotal {
}
</style>
