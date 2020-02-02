<template lang="pug">
	div(:class="$style.container") product
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ type: Number, required: true }) readonly id!: number
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: String, required: true }) readonly thumbnail!: string
  @Prop({ type: Number, required: true }) readonly price!: number
}
</script>

<style lang="scss" module>
.container {
}
</style>
