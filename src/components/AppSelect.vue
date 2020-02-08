<template lang="pug">
	select(v-model="value" @change="input()")
		option(disabled value="") {{ label }}
		option(v-for="(option, index) in options" :key="index" :value="option.value") {{ option.label }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class AppSelect extends Vue {
	@Prop({type: String, required: true}) readonly label!: String
	@Prop({ type: Array, required: true }) readonly options!: object[]

	value = ""

	@Emit()
	input() {
		return this.value
	}

}
</script>
