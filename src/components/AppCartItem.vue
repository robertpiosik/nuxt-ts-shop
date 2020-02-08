<template lang="pug">
	div(:class="$style.container")

		div(:class="$style.thumbnailAndTitle")
			div(:class="$style.thumbnail")
				img(:src="thumbnail")
			div(:class="$style.titleAndRemove")
				div(:class="$style.title") {{ title }}
				div(:class="$style.remove" role="button" remove @click="removeItem()") &#10005 Remove

		div(:class="$style.quantity")
			div(:class="$style.quantityAmount") {{ quantity }}
			button(
				:class="$style.quantityButton"
				@click="decreaseQuantity()"
				decreaseQuantity
			) -
			button(
				:class="$style.quantityButton"
				@click="increaseQuantity()"
				increaseQuantity
			) +

		div(:class="$style.priceAndTotal")
			div(v-if="price !== price * quantity") {{ `${priceFormatted.value + priceFormatted.penny} zł` }}
			div(v-if="price === price * quantity") #[strong {{ `${priceFormatted.value + priceFormatted.penny} zł` }}]
			div(v-if="price !== price * quantity") #[strong {{ `${totalFormatted.value + totalFormatted.penny} zł` }}]
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import { priceFormatter } from './../utils/transformations'

@Component
export default class CartItem extends Vue {
  @Prop({ type: String, required: true }) readonly title!: any
  @Prop({ type: Number, required: true }) readonly price!: number
  @Prop({ type: String, required: true }) readonly thumbnail!: any
  @Prop({ type: Number, required: true }) readonly quantity!: any

  get priceFormatted() {
    return priceFormatter(this.price)
  }

  get totalFormatted() {
    return priceFormatter(this.price * this.quantity)
  }

  @Emit()
  increaseQuantity() {}

  @Emit()
  decreaseQuantity() {}

  @Emit()
  removeItem() {}
}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-gap: 1.5rem;
  margin: 1.5rem 0;
  max-width: 65rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.1rem solid rgba(black, 0.1);
  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
  @include toSmall {
    grid-template-columns: 8rem 1fr;
    grid-template-rows: repeat(2, auto);
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
.titleAndRemove {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: $primary;
}
.remove {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(black, 0.3);
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 0;
  &:hover {
    color: red;
  }
}
.quantity {
  justify-self: end;

  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.quantityAmount {
  grid-row-start: 1;
  grid-row-end: 3;

  justify-self: end;
  align-self: center;
  font-weight: bold;
  margin-right: 1rem;
}
.quantityButton {
  justify-self: center;

  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid rgba(black, 0.1);
  border-radius: 0.5rem;
  font-weight: bold;
  &:hover {
    background: rgba(black, 0.1);
  }
  &:first-of-type {
    align-self: end;
  }
}
.priceAndTotal {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
