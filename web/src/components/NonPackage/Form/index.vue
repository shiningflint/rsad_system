<template>
  <b-form @submit.prevent="onSubmit">
    <router-view v-bind="$props" class="mb-3" />
  </b-form>
</template>

<script>
import { mixin } from '../mixin'

export default {
  name: 'NonPackageForm',

  mixins: [mixin],

  methods: {
    onSubmit () {
      const invalid = (() => {
        const validator = this.v.form
        validator.$touch()
        return validator.$invalid
      })()

      if (invalid) return

      this.$router.push({ name: this.$path.nonPackage.invoice })
    },
  },
}
</script>
