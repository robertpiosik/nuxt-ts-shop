<template>
  <app-section title="Home">
    <nuxt-link to="shop">Go to shop</nuxt-link>
  </app-section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AppSection from './../components/AppSection.vue';

@Component({
  components: { AppSection }
})
export default class PageIndex extends Vue {}
</script>