<template lang="pug">
	transition-group(
		:class="$style.grid"
		:move-class="$style.move"
		tag="div"
	)
		slot
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class ProductsGrid extends Vue {}
</script>

<style lang="scss" module>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  margin: 1.5rem 0;
  @include atSmall {
    margin: 3rem 0;
  }
  @include atMedium {
    grid-template-columns: repeat(3, 1fr);
  }
  @include atLarge {
    grid-template-columns: repeat(4, 1fr);
  }
}
.move {
  transition: transform 0.5s ease-in-out;
}
</style>
