<template lang="pug">
	div(:class="$style.container") {{ test }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppTest extends Vue {
  test = 'Some test property';
}
</script>

<style lang="scss" module>
.container {
  background: red;
}
</style>
