<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group label="Agree and confirm">
      <b-form-checkbox
        v-model="agree"
      >
        I agree on everything
      </b-form-checkbox>
    </b-form-group>

    <hr class="confirm-hr" />

    <b-form-group>
      <b-button
        class="confirm-button"
        type="submit"
        :disabled="isInvalid"
      >
        Agree and commmit
      </b-button>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'NonPackageConfirm',

  data () {
    return {
      agree: false
    }
  },

  computed: {
    isInvalid () {
      return !this.agree
    }
  },

  methods: {
    onSubmit () {
      this.$emit('addOrder')
      this.$router.push({ name: this.$path.nonPackage.done })
    }
  },
}
</script>
