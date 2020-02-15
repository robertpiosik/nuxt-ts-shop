<template lang="pug">
	div(:class="$style.container")
		div(:class="$style.thumbnail")
			img(
				:src="thumbnail"
				:alt="title"
				ref="thumbnailImage"
			)
		div(:class="$style.title") {{ title }}
		div(:class="$style.price")
			span(:class="$style.priceValue") {{ value }}
			span(:class="$style.pricePenny") {{ penny }}
			span {{ ` zł` }}
		div(:class="$style.addToCart")
			app-button(@click="addToCart()" addToCart) ADD TO CART
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator';

import AppButton from './../components/AppButton.vue';

import { priceFormatter } from '../utils/transformations';

@Component({ components: { AppButton } })
export default class ProductsGridItem extends Vue {
  @Prop({ type: String, required: true }) readonly title!: any;
  @Prop({ type: Number, required: true }) readonly price!: any;
  @Prop({ type: String, required: true }) readonly thumbnail!: any;

  value = '';
  penny = '';

  @Watch('price', { immediate: true })
  formatPrice() {
    const { value, penny } = priceFormatter(this.price);
    this.value = value;
    this.penny = penny;
  }

  @Emit()
  addToCart() {}

  @Ref('thumbnailImage') readonly thumbnailImage!: HTMLImageElement;

  mounted() {
    (<any>window).objectFitPolyfill(this.thumbnailImage);
  }
}
</script>

<style lang="scss" module>
.container {
  @include toSmall {
    padding: 1.5rem 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  &:hover img {
    transform: scale(1.05);
  }
}
.thumbnail {
  overflow: hidden;
  border-radius: 1rem;
  @include toExtraSmall {
    width: 9rem;
    height: 9rem;
  }
  width: 12rem;
  height: 12rem;
  @include atSmall {
    width: 20rem;
    height: 20rem;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ease-in-out 0.2s;
  }
}
.title {
  @include toExtraSmall {
    font-size: 1.4rem;
  }
  font-weight: bold;
  font-size: 1.6rem;
  color: $primary;
  margin: 1.5rem 0 0.5rem 0;
  @include atSmall {
    font-size: 2rem;
  }
}
.price {
  @include toExtraSmall {
    font-size: 1.2rem;
  }
  font-size: 1.4rem;
  @include atSmall {
    font-size: 1.6rem;
  }
}
.priceValue {
  @include toExtraSmall {
    font-size: 1.6rem;
  }
  font-size: 1.8rem;
  font-weight: bold;
  @include atSmall {
    font-size: 2rem;
  }
}
.pricePenny {
  @include toExtraSmall {
    font-size: 1.4rem;
  }
  font-size: 1.6rem;
  @include atSmall {
    font-size: 1.8rem;
  }
}
.addToCart {
  margin-top: 1rem;
}
</style>
