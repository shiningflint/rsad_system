<template>
  <div>
    <h2>Non Paket</h2>

    <div class="p-3">
      <router-view
        class="mb-3"
        v-bind="pageProps"
        @addOrder="addOrder"
      />
    </div>

    <!--
    <div>
      <button type="button" @click="debugAddOrder">Debug save locally</button>
    </div>
    -->

    <!-- <div>Total price: Rp {{ totalPrice }}</div> -->
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { AllPackageItems, religions, sexIsoToWord } from '../constants/nonPackage'
import { formatMoney } from '../utilities/currency'
import { PdfPrinter } from '../lib/PdfPrinter'
import { ClockWizard } from '../lib/ClockWizard'
// import { nonPackageForm } from '../documentation/NonPackageForm'

export default {
  name: 'NonPackageView',

  data () {
    return {
      form: {
        package_item_orders: [],
        death_record: {
          facility: null,
          sex: null,
          name: '',
          religion: religions.none.value,
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
      formLabel: {
        package_item_orders: 'Daftar Produk',
        death_record: {
          title: 'Data Almarhum/ah',
          facility: 'Rumah Duka',
          sex: 'Jenis kelamin',
          name: 'Nama lengkap',
          religion: 'Agama',
          occupation: 'Pekerjaan',
          death_location: 'Meninggal di',
          death_date: 'Meninggal pada tanggal dan jam',
          contact_time: 'Waktu dihubungi jam',
          pickup_time: 'Jemput/tiba jam',
          birthplace: 'Lahir di tempat',
          birthdate: 'Lahir tanggal',
          address: 'Alamat almarhum/ah',
        },
        requester: {
          title: 'Data Permintaan',
          name: 'Nama',
          address: 'Alamat',
          email: 'Email',
          phone_numbers: {
            title: 'No. Telepon',
          },
        },
      },
    }
  },

  computed: {
    ...mapGetters({
      facility: 'getFacility',
      facilityTranslations: 'getFacilityTranslation',
    }),
    pageProps () {
      return {
        form: this.form,
        packageItems: AllPackageItems,
        formLabel: this.formLabel,
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

    // debugAddOrder () {
    //   this.saveLocally()
    // },

    addOrder () {
      this.saveLocally()
      this.printPdf()
    },

    transformFormValues () {
      const result = JSON.parse(JSON.stringify(this.form))
      const clockWizard = new ClockWizard()

      result.death_record.facility = this.facilityTranslations[this.form.death_record.facility]
      result.death_record.sex = sexIsoToWord[this.form.death_record.sex]
      result.death_record.religion = religions[this.form.death_record.religion].text
      result.death_record.death_date = clockWizard.jsonToDateTimeString(this.form.death_record.death_date)
      result.death_record.contact_time = this.form.death_record.contact_time.substring(0, 5)
      result.death_record.pickup_time = this.form.death_record.pickup_time.substring(0, 5)

      return result
    },

    pdfPayload () {
      const orderedItems = this.form.package_item_orders.map(item => {
                             return AllPackageItems.find(a => a.value === item)
                           })
      const payloadValues = this.transformFormValues()

      return {
        ...payloadValues,
        label: this.formLabel,
        package_item_orders_object: orderedItems,
      }
    },

    printPdf () {
      const printer = new PdfPrinter(this.pdfPayload(), 'NonPackage')
      printer.press()
    },

    saveLocally () {
      this.$localDb.saveNonPackage(this.form)
      .then(() => {
        console.log('saved successfully')
      })
      .catch(err => {
        console.warn('local save error', err)
      })
    },
  },

  validations: {
    form: {
      // package_item_orders: { required, },
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

  created () {
    this.form.death_record.facility = this.facility
  },
}
</script>
