<template>
  <div>
    Sync page here
    <button type="button" @click="onSyncClick">
      sync
    </button>
    <button type="button" @click="onLoginClick">
      login
    </button>
    <button type="button" @click="onLogoutClick">
      logout
    </button>
    <p v-show="error">
      {{ this.error }}
    </p>
  </div>
</template>

<script>
import { GdriveManager } from '../lib/GdriveManager'

export default {
  name: 'Sync',

  data () {
    return {
      error: '',
      gdriveManager: null,
    }
  },

  methods: {
    onSyncClick () {
      this.$localDb.getAll()
      .then((orders) => {
        this.error = ''
        this.gdriveManager.run(orders)
      })
    },

    onLoginClick () {
      this.error = ''
      this.gdriveManager.login()
    },

    onLogoutClick () {
      this.error = ''
      this.gdriveManager.logout()
    },
  },

  created () {
      const errorHandler = (errorString) => {
        this.error = errorString
      }
      this.gdriveManager = new GdriveManager(errorHandler)
  },
}
</script>
