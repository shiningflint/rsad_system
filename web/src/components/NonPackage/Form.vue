<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group label="Service">
      <b-form-checkbox-group
        id="service"
        v-model="form.selectedServices"
        :options="options.serviceOptions"
      />
    </b-form-group>

    <b-form-group label="Facility">
      <b-form-checkbox-group
        id="facility"
        v-model="form.selectedFacilities"
        :options="options.facilityOptions"
      />
    </b-form-group>

    <b-form-group label="Product">
      <b-form-checkbox-group
        id="product"
        v-model="form.selectedProducts"
        :options="options.productOptions"
      />
    </b-form-group>

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
    options: {
      type: Object,
      required: true
    },
  },

  methods: {
    onSubmit () {
      this.$router.push({ name: 'NonPackageInvoice' })
    },
  },
}
</script>
