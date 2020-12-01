<template>
  <div>
    Sync page here
    <button type="button" @click="onSyncClick">
      sync
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
    }
  },

  methods: {
    onSyncClick () {
      this.error = ''
      const errorHandler = (errorString) => {
        this.error = errorString
      }
      const gdriveManager = new GdriveManager(errorHandler)

      gdriveManager.run()

      console.log('gdrive manager', gdriveManager)
    },
  },
}
</script>

