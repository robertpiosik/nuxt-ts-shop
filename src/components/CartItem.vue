<template lang="pug">
	div(:class="$style.container")
		div(:class="$style.thumbnailAndTitle")
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
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: Number, required: true }) readonly price!: number
  @Prop({ type: String, required: true }) readonly thumbnail!: string
  @Prop({ type: Number, required: true }) readonly quantity!: number

  get priceFormatted() {
    return priceFormatter(this.price)
  }

  get totalFormatted() {
    return priceFormatter(this.price * this.quantity)
  }

  @Emit('increaseQuantity')
  increaseQuantity() {}

  @Emit('decreaseQuantity')
  decreaseQuantity() {}
}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-gap: 1.5rem;
  margin: 1.5rem 0;
  max-width: 70rem;
  @include toSmall {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @include atSmall {
    grid-template-columns: 4fr 1fr 1fr;
  }
}
.thumbnailAndTitle {
  @include toSmall {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  display: grid;
  grid-template-columns: 8rem auto;
  grid-template-rows: 8rem;
  grid-gap: 1.5rem;
  @include atSmall {
    grid-template-columns: 10rem auto;
    grid-template-rows: 10rem;
  }
}
.thumbnail {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
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
