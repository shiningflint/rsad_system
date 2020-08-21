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
import { AllPackageItems } from '../constants/nonPackageProducts'
import { formatMoney } from '../utilities/currency'

export default {
  name: 'PackageView',

  data () {
    return {
      form: {
        packageItemOrders: [],
      },
    }
  },

  computed: {
    pageProps () {
      return {
        form: this.form,
        packageItems: AllPackageItems,
      }
    },
    totalPrice () {
      return formatMoney(this.getTotalPrice())
    }
  },

  methods: {
    getTotalPrice () {
      let totalPrice = 0

      this.form.packageItemOrders.forEach(item => {
        const result = AllPackageItems.find(a => a.value === item)
        if (result && result.price) {
          totalPrice += result.price
        }
      })

      return totalPrice
    },
    addOrder () {
      const orderDetails = []

      this.form.packageItemOrders.forEach(item => {
        const result = AllPackageItems.find(a => a.value === item)
        if (result && result.price) {
          orderDetails.push({
            value: result.value,
            price: result.price,
          })
        }
      })

      this.$db.death_records.put({
        package_item_orders: orderDetails,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    },
  },
}
</script>
