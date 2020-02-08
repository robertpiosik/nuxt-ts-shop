<template lang="pug">
	section(:class="$style.section")
		div(:class="$style.wrapper")
			template(v-if="title")
				div(:class="$style.title")
					h1 {{ title }}
			slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppSection extends Vue {
  @Prop(String) readonly title?: any
}
</script>

<style lang="scss" module>
.section {
  margin: 4rem 0;
  @include atSmall {
    margin: 6rem 0;
  }
}
.wrapper {
  @include wrapper;
}
.title {
  margin-bottom: 1.5rem;
  @include atSmall{
    margin-bottom: 3rem;
  }
  & h1 {
		@include h1;
		line-height: 1;
  }
}
</style>
