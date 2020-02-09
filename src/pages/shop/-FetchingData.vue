<template lang="pug">
	app-section {{ `Fetching products data${dots}` }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import AppSection from './../../components/AppSection.vue'

@Component({ components: { AppSection } })
export default class FetchingData extends Vue {
	dots = '...'
	
  created() {
    setInterval(() => {
      if (this.dots === '') {
        this.dots = '.'
      } else if (this.dots === '.') {
        this.dots = '..'
      } else if (this.dots === '..') {
        this.dots = '...'
      } else if (this.dots === '...') {
        this.dots = ''
      }
    }, 100)
  }
}
</script>
