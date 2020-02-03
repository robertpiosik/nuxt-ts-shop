<template lang="pug">
	component(
		:is="buttonType"
		:to="to"
		:href="href"
		v-on="$listeners"
		:class="$style.button"
		v-bind="$attrs"
	)
		slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop(String) readonly to?: string
  @Prop(String) readonly href?: string
  @Prop({ type: String, default: 'normal' }) readonly size!:
    | 'small'
    | 'normal'
    | 'large'
  @Prop({ type: Boolean, default: false }) readonly isLoading!: boolean

  get buttonType() {
    if (this.to && this.to.length > 0) {
      return 'nuxt-link'
    } else if (this.href && this.href.length > 0) {
      return 'a'
    } else {
      return 'button'
    }
  }
}
</script>

<style lang="scss" module>
.button {
  @include toExtraSmall {
    font-size: 1.4rem;
    padding: 0.6rem 1rem;
  }
  background: $primary;
  color: white;
  font-weight: 600;
  padding: 1rem 1.3rem;
  border-radius: 0.5rem;
  &:hover {
    filter: brightness(120%);
  }
  &:active {
    transform: scale(0.98);
  }
}
</style>
