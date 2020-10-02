<template>
  <div>
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
    <h3>Daftar kematian</h3>
    <div class="text-left">
      <p v-for="(value, key) in form.death_record" :key="key">
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

    <b-button
      type="button"
      :disabled="isInvalid"
      @click="onConfirm"
    >
      Konfirmasi
    </b-button>
  </div>
</template>

<script>
import { AllPackageItems } from '../../constants/nonPackage'

export default {
  name: 'NonPackageInvoice',

  props: {
    form: {
      type: Object,
      required: true
    },
  },

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
      return this.form.package_item_orders.length === 0
    },
  },

  methods: {
    onConfirm () {
      this.$router.push({ name: this.$path.nonPackage.confirm })
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
