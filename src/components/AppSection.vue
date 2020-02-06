<template lang="pug">
	section(:class="$style.section")
		div(:class="$style.wrapper")
			template(v-if="title")
				div(:class="$style.title")
					h2 {{ title }}
			slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppSection extends Vue {
  @Prop(String) readonly title?: string
}
</script>

<style lang="scss" module>
.section {
  margin: 4rem 0;
  @include atMedium {
    margin: 6rem 0;
  }
}
.wrapper {
  @include wrapper;
}
.title {
  margin-bottom: 1rem;
  @include atMedium {
    margin-bottom: 2rem;
  }
  & h2 {
    @include h2;
  }
}
</style>
