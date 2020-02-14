<template lang="pug">
	div(:class="$style.container")

		div(:class="$style.thumbnailAndTitle")
			div(:class="$style.thumbnail")
				img(:src="thumbnail")
			div(:class="$style.titleAndRemove")
				div(:class="$style.title") {{ title }}
				div
					button(
						:class="$style.remove"
						@click="removeItem()"
					  remove
					) &#10005; Remove

		div(:class="$style.quantity")
			div(:class="$style.quantityAmount") {{ quantity }}
			button(
				:class="[$style.quantityButton, $style.quantityButtonDecrease]"
				@click="decreaseQuantity()"
				decreaseQuantity
			) -
			button(
				:class="[$style.quantityButton, $style.quantityButtonIncrease]"
				@click="increaseQuantity()"
				increaseQuantity
			) +

		div(:class="$style.priceAndTotal")
			template(v-if="price !== price * quantity")
				div {{ `${priceFormatted.value + priceFormatted.penny} zł` }}
				div #[strong {{ `${totalFormatted.value + totalFormatted.penny} zł` }}]
			template(v-else)
				div #[strong {{ `${priceFormatted.value + priceFormatted.penny} zł` }}]
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
  margin: 1.5rem 0;
  max-width: 65rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.1rem solid rgba(black, 0.1);
  grid-template:
    'thumbnailAndTitle thumbnailAndTitle'
    'quantity priceAndTotal' / 8rem 1fr;
  gap: 1.5rem;
  @include atSmall {
    grid-template: 'thumbnailAndTitle quantity priceAndTotal' / 3fr 1fr 1fr;
  }
}
.thumbnailAndTitle {
  grid-area: thumbnailAndTitle;

  display: grid;
  grid-template-columns: 8rem auto;
  grid-template-rows: 8rem;
  gap: 1.5rem;
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
  grid-area: quantity;
  justify-self: end;

  display: grid;
  gap: 0.5rem;
  grid-template:
    'quantityAmount quantityButtonDecrease' 1fr
    'quantityAmount quantityButtonIncrease' 1fr / auto auto;
}
.quantityAmount {
  grid-area: quantityAmount;

  align-self: center;
  font-weight: bold;
  margin-right: 1rem;
}
.quantityButtonDecrease {
  grid-area: quantityButtonDecrease;
}
.quantityButtonIncrease {
  grid-area: quantityButtonIncrease;
}
.quantityButton {
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
  grid-area: priceAndTotal;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
