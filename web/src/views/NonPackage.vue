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
import { required } from 'vuelidate/lib/validators'
import { AllPackageItems } from '../constants/nonPackageProducts'
import { religions } from '../constants/religions'
import { formatMoney } from '../utilities/currency'

export default {
  name: 'PackageView',

  data () {
    return {
      form: {
        package_item_orders: [],
        death_record: {
          sex: null,
          name: '',
          religion: religions.none,
          occupation: '',
          death_location: '',
          death_date: '',
          contact_time: '',
          pickup_time: '',
          birthplace: '',
          birthdate: '',
          address: '',
        },
        requester: {
          name: '',
          address: '',
          email: '',
          phone_numbers: [
            { number: '', variety: 'mobile' },
          ],
        },
      },
    }
  },

  computed: {
    pageProps () {
      return {
        form: this.form,
        packageItems: AllPackageItems,
        v: this.$v,
      }
    },
    totalPrice () {
      return formatMoney(this.getTotalPrice())
    }
  },

  methods: {
    getTotalPrice () {
      let totalPrice = 0

      this.form.package_item_orders.forEach(item => {
        const result = AllPackageItems.find(a => a.value === item)
        if (result && result.price) {
          totalPrice += result.price
        }
      })

      return totalPrice
    },
    addOrder () {
      alert('sending form!')
      // const orderDetails = []

      // this.form.package_item_orders.forEach(item => {
      //   const result = AllPackageItems.find(a => a.value === item)
      //   if (result && result.price) {
      //     orderDetails.push({
      //       value: result.value,
      //       price: result.price,
      //     })
      //   }
      // })

      // this.$db.death_records.put({
      //   package_item_orders: orderDetails,
      //   created_at: new Date().toISOString(),
      //   updated_at: new Date().toISOString()
      // })
    },
  },

  validations: {
    form: {
      package_item_orders: { required, },
      death_record: {
        sex: { required, },
        name: { required, },
        religion: { required, },
        death_location: { required, },
        death_date: { required, },
        birthdate: { required, },
        address: { required, },
      },
      requester: {
        name: { required, },
        address: { required, },
        phone_numbers: {
          required,
          $each: {
            number: { required, },
            variety: { required, },
          },
        },
      },
    },
  },
}
</script>
