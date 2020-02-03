<template lang="pug">
	main
		nuxt
		footer(:class="$style.footer")
				div(:class="$style.drinkWater") Stay hydrated 💧
</template>

<style lang="scss" module>
.footer {
  margin: 8rem 0 6rem 0;
	@include atSmall {
  margin: 12rem 0 10rem 0;

	}
}
.drinkWater {
  text-align: center;
}
</style>
