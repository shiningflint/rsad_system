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

  data () {
    return {
      refreshing: false,
    }
  },

  computed: {
    showHeader () {
      return this.$route.matched.find(r => r.meta.showHeader)
    }
  },

  methods: {
    listenServiceWorker () {
      document.addEventListener(
        'serviceWorkerUpdateEvent', this.confirmUpdateDialog, { once: true }
      )
      navigator.serviceWorker.addEventListener(
        'controllerchange',
        () => {
          if (this.refreshing) return
          this.refreshing = true
          window.location.reload()
        }
      )
    },
    confirmUpdateDialog (e) {
      const registration = e.detail
      alert('Ada perbaruan di aplikasi. Halaman akan refresh setelah konfirmasi.')

      if (registration || registration.waiting) {
        registration.waiting.postMessage({type:'SKIP_WAITING'})
      }
    },
  },

  created () {
    this.$store.dispatch('initImages')

    this.listenServiceWorker()
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
