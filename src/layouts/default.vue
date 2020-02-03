<template lang="pug">
	div
		header(:class="$style.header")
			div(:class="$style.headerWrapper")
				div(:class="$style.headerText") Nuxt.js &amp; TypeScript Example App
		nuxt
		footer(:class="$style.footer")
				div(:class="$style.footerReminder") Stay hydrated 💧
</template>

<style lang="scss" module>
.header {
  background: $primary;
}
.headerWrapper {
  @include wrapper;
}
.headerText {
	color: white;
	font-weight: bold;
	padding: 1rem 0;
}
.footer {
  margin: 8rem 0 6rem 0;
  @include atSmall {
    margin: 12rem 0 10rem 0;
  }
}
.footerReminder {
  text-align: center;
}
</style>
