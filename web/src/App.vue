<template>
  <div id="app" class="app">
    <app-header v-if="showHeader" />
    <router-view />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'App',

  components: {
    AppHeader
  },

  computed: {
    showHeader () {
      return this.$route.matched.find(r => r.meta.showHeader)
    }
  },

  created () {
    this.$store.dispatch('initImages')
  },
}
</script>

<style lang="scss" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto 0 auto;
  max-width: 600px;
}
</style>
