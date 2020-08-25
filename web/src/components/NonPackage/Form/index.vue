<template>
  <b-form @submit.prevent="onSubmit">
    <router-view v-bind="$props" class="mb-3" />
    <b-button type="submit">Confirm</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'NonPackageForm',

  props: {
    form: {
      type: Object,
      required: true
    },
    packageItems: {
      type: Array,
      required: true
    },
  },

  methods: {
    onSubmit () {
      this.$router.push({ name: this.$path.nonPackage.invoice })
    },
  },
}
</script>
