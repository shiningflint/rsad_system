<template>
  <div>
    <!--
      <h1>Invoice</h1>
      <div>
        <p>Layanan yang dipilih</p>
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
        <p>Fasilitas yang dipilih</p>
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
        <p>Produk yang dipilih</p>
        <ul>
          <li
            v-for="(product, index) in selectedPackageItem('product')"
            :key="index"
          >
            {{ product.text }} - {{ product.price }}
          </li>
        </ul>
      </div>

      <hr />
    -->

    <h3>Daftar kematian</h3>
    <div class="text-left">
      <p v-for="(value, key) in translatedDeathRecord(form.death_record)" :key="key">
        <span>{{ `${t.death_record[key]}:` }}</span><br />
        <span>{{ `${value}` }}</span>
      </p>
    </div>

    <hr />
    <h3>Atas permintaan</h3>
    <div class="text-left">
      <p v-for="(value, key) in form.requester" :key="key">
        <span>{{ `${t.requester[key]}:` }}</span><br />
        <template v-if="Array.isArray(value)">
          <div v-for="(phone, index) in value" :key="index">
            <span>Nomor({{ phone.variety }}): </span>
            <span>{{ phone.number }}</span>
            <br />
          </div>
        </template>
        <span v-else>{{ `${value}` }}</span>
      </p>
    </div>

    <hr class="confirm-hr" />

    <b-button
      class="confirm-button"
      type="button"
      :disabled="isInvalid"
      @click="onConfirm"
    >
      Simpan PDF
    </b-button>
  </div>
</template>

<script>
import { AllPackageItems } from '../../constants/nonPackage'
import { translatedDeathRecord } from './Utilities'
import { mixin } from './mixin'

export default {
  name: 'NonPackageInvoice',

  mixins: [mixin],

  data () {
    return {
      t: {
        death_record: {
          sex: 'Jenis Kelamin',
          name: 'Nama',
          religion: 'Agama',
          occupation: 'Pekerjaan',
          death_location: 'Meninggal di',
          death_date: 'Waktu meninggal',
          contact_time: 'Waktu dihubungi',
          pickup_time: 'Waktu kedatangan',
          birthplace: 'Tempat lahir',
          birthdate: 'Tanggal lahir',
          address: 'Alamat',
        },
        requester: {
          name: 'Nama',
          address: 'Alamat',
          email: 'Email',
          phone_numbers: 'Telepon',
        },
      },
    }
  },

  computed: {
    isInvalid () {
      const invalid = (() => {
        const validator = this.v.form
        validator.$touch()
        return validator.$invalid
      })()

      return invalid
    },
  },

  methods: {
    translatedDeathRecord,
    onConfirm () {
      // this.$router.push({ name: this.$path.nonPackage.confirm })
      this.$emit('addOrder')
    },
    selectedPackageItem (category) {
      const result = this.form.package_item_orders
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
