<template>
  <div>
    <h2>Non Paket</h2>
    <router-view
      class="mb-3"
      v-bind="pageProps"
      @addOrder="addOrder"
    />
    <div>Total price: Rp {{ totalPrice }}</div>
  </div>
</template>

<script>
import { services, facilities, products } from '../constants/nonPackageProducts'
import { formatMoney } from '../utilities/currency'

export default {
  name: 'PackageView',

  data () {
    return {
      form: {
        selectedServices: [],
        selectedFacilities: [],
        selectedProducts: []
      },
      serviceOptions: [],
      facilityOptions: [],
      productOptions: [],
    }
  },

  computed: {
    pageProps () {
      return {
        form: this.form,
        options: {
          serviceOptions: this.serviceOptions,
          facilityOptions: this.facilityOptions,
          productOptions: this.productOptions,
        }
      }
    },
    allItems () {
      return [
        ...services,
        ...facilities,
        ...products,
      ]
    },
    selectedItems () {
      return [
        ...this.form.selectedServices,
        ...this.form.selectedFacilities,
        ...this.form.selectedProducts,
      ]
    },
    totalPrice () {
      return formatMoney(this.getTotalPrice())
    }
  },

  methods: {
    getTotalPrice () {
      let totalPrice = 0

      this.selectedItems.forEach(item => {
        const result = this.allItems.find(a => a.value === item)
        if (result && result.price) {
          totalPrice += result.price
        }
      })

      return totalPrice
    },
    addOrder () {
      const orderDetails = []

      this.selectedItems.forEach(item => {
        const result = this.allItems.find(a => a.value === item)
        if (result && result.price) {
          orderDetails.push({
            value: result.value,
            price: result.price,
          })
        }
      })

      this.$db.orders.put({
        products: orderDetails,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    },
  },

  created () {
    this.serviceOptions = services
    this.facilityOptions = facilities
    this.productOptions = products
  },
}
</script>
