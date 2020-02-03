<template lang="pug">
	div(:class="$style.grid")
		slot
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class extends Vue {}
</script>

<style lang="scss" module>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  @include atMedium {
    grid-template-columns: repeat(3, 1fr);
  }
  @include atLarge {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
