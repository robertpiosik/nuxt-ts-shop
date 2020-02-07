<template lang="pug">
	div
		header(:class="$style.header")
			div(:class="$style.headerWrapper")
				div(:class="$style.headerText") Type-Safe Nuxt.js App
		nuxt(keep-alive)
		footer(:class="$style.footer")
			div(:class="$style.footerReminder") Stay hydrated 💧and type-safe 👀
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
  height: 4.5rem;
  display: flex;
  align-items: center;
  @include atSmall {
    height: 5rem;
    font-size: 2rem;
  }
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
