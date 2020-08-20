<template>
  <div>
    Invoice
    <div>
      <p>Selected services</p>
      <ul>
        <li
          v-for="(service, index) in selectedPackageItem('service')"
          :key="index"
        >
          {{ service.text }} - {{ service.price }}
        </li>
      </ul>
    </div>

    <div>
      <p>Selected facilities</p>
      <ul>
        <li
          v-for="(facility, index) in selectedPackageItem('facility')"
          :key="index"
        >
          {{ facility.text }} - {{ facility.price }}
        </li>
      </ul>
    </div>

    <div>
      <p>Selected products</p>
      <ul>
        <li
          v-for="(product, index) in selectedPackageItem('product')"
          :key="index"
        >
          {{ product.text }} - {{ product.price }}
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
import { AllPackageItems } from '../../constants/nonPackageProducts'

export default {
  name: 'NonPackageInvoice',

  props: {
    form: {
      type: Object,
      required: true
    },
  },

  computed: {
    isInvalid () {
      return this.form.packageItemOrders.length === 0
    },
  },

  methods: {
    onConfirm () {
      this.$router.push({ name: 'NonPackageConfirm' })
    },
    selectedPackageItem (category) {
      const result = this.form.packageItemOrders
        .map(value => {
          return AllPackageItems.find(item => {
            return item.value === value
          })
        })
        .filter(item => item.category === category)
      return result
    }
  }
}
</script>
