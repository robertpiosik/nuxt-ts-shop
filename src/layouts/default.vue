<template lang="pug">
	div
		header(:class="$style.header")
			div(:class="$style.headerWrapper")
				div(:class="$style.headerText") Type-Safe Nuxt.js App
		nuxt
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
  padding: 0.8rem 0;
  @include atSmall {
    font-size: 1.8rem;
    padding: 1rem 0;
  }
  @include atMedium {
    font-size: 2rem;
    padding: 1.1rem 0;
  }
  @include atLarge {
    font-size: 2.2rem;
    padding: 1.2rem 0;
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
