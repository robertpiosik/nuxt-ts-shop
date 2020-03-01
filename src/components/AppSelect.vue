<template>
  <select v-model="value" @change="input()" :class="$style.select">
    <option disabled="disabled" value="">{{ label }}</option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
      >{{ option.label }}</option
    >
  </select>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import { SortingOption } from './../interfaces/SortingOption.interface';

@Component
export default class AppSelect extends Vue {
  @Prop({ type: String, required: true }) readonly label!: string;
  @Prop({ type: Array, required: true }) readonly options!: SortingOption[];

  value = '';

  @Emit()
  input() {
    return this.value;
  }
}
</script>

<style lang="scss" module>
.select {
  appearance: none;
  position: relative;
  font-weight: bold;
  padding: 1rem 1.3rem;
  border-radius: 0.5rem;
  width: 20rem;
  border: 0.1rem solid rgba(black, 0.1);
  background: url('/images/arrow.svg') 94% / 8% no-repeat white;
  &:hover {
    background: url('/images/arrow.svg') 94% / 8% no-repeat rgba(black, 0.1);
  }
}
</style>
