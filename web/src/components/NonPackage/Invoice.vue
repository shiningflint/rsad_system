<template>
  <div>
    Invoice
    <div>
      <p>Selected services</p>
      <ul>
        <li
          v-for="(service, index) in this.form.selectedServices"
          :key="index"
        >
          {{ service }}
        </li>
      </ul>
    </div>

    <div>
      <p>Selected facilities</p>
      <ul>
        <li
          v-for="(facility, index) in this.form.selectedFacilities"
          :key="index"
        >
          {{ facility }}
        </li>
      </ul>
    </div>

    <div>
      <p>Selected products</p>
      <ul>
        <li
          v-for="(product, index) in this.form.selectedProducts"
          :key="index"
        >
          {{ product }}
        </li>
      </ul>
    </div>

    <b-button
      type="button"
      :disabled="isInvalid"
      @click="onConfirm"
    >
      Confirm
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'NonPackageInvoice',

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

  computed: {
    isInvalid () {
      return this.form.selectedServices.length +
        this.form.selectedFacilities.length +
        this.form.selectedProducts.length === 0
    }
  },

  methods: {
    onConfirm () {
      this.$router.push({ name: 'NonPackageConfirm' })
    },
  }
}
</script>
