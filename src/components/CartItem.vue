<template lang="pug">
	div(:class="$style.container")
		div(:class="$style.thumbnail")
			img(:src="thumbnail")
		div(:class="$style.title") {{ title }}
		div(:class="$style.quantity")
			div {{ quantity }}
			div(@click="decreaseQuantity()") -
			div(@click="increaseQuantity()") +
		div(:class="$style.priceAndTotal")
			div {{ `${priceFormatted.value + priceFormatted.penny} zł` }}
			div(v-if="price !== price * quantity") {{ `${totalFormatted.value + totalFormatted.penny} zł` }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

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

  @Emit('increaseQuantity')
  increaseQuantity() {}

  @Emit('decreaseQuantity')
  decreaseQuantity() {}
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
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
  border-radius: 0.5rem;
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
  font-weight: bold;
  color: $primary;
}
.quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
}
.priceAndTotal {
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
