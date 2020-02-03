<template lang="pug">
	div(:class="$style.container")
		div(:class="$style.thumbnail")
			img(:src="thumbnail")
		div(:class="$style.title") {{ title }}
		div(:class="$style.price")
			span(:class="$style.priceValue") {{ value }}
			span(:class="$style.pricePenny") {{ penny }}
			span {{ ` zł` }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import { priceFormatter } from '../utils/transformations'

@Component
export default class extends Vue {
  @Prop({ type: Number, required: true }) readonly id!: number
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: Number, required: true }) readonly price!: number
  @Prop({ type: String, required: true }) readonly thumbnail!: string

  value = ''
  penny = ''

  @Watch('price', { immediate: true })
  formatPrice() {
    const { value, penny } = priceFormatter(this.price)
    this.value = value
    this.penny = penny
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border: 0.1rem solid rgba(black, 0.1);
}
.thumbnail {
  position: relative;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
}
.title {
  font-weight: bold;
  font-size: 2rem;
	color: $primary;
	margin: 1.5rem 0 .5rem 0;
}
.price {
  font-size: 1.6rem;
}
.priceValue {
	font-size: 2rem;
	font-weight: bold;
}
.pricePenny {
	font-size: 1.8rem;
}
</style>
