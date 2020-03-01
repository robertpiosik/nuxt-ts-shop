<template>
  <component
    :is="buttonType"
    :to="to"
    :href="href"
    v-on="$listeners"
    :class="$style.button"
    v-bind="$attrs"
    ><slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AppButton extends Vue {
  @Prop(String) readonly to?: string;
  @Prop(String) readonly href?: string;

  get buttonType() {
    if (this.to && this.to.length > 0) {
      return 'nuxt-link';
    } else if (this.href && this.href.length > 0) {
      return 'a';
    } else {
      return 'button';
    }
  }
}
</script>

<style lang="scss" module>
.button {
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
