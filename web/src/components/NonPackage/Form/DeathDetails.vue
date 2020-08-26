<template>
  <div>
    <b-form-group label="Jenis kelamin*">
      <b-form-radio-group
        id="sex"
        name="sex"
        v-model="form.sex"
        :options="sexOptions"
        required
      />
    </b-form-group>
    <b-form-group label="Nama lengkap*">
      <b-form-input
        id="name"
        v-model="form.name"
        required
      />
    </b-form-group>
    <b-form-group label="Agama">
      <b-form-select
        id="religion"
        v-model="form.religion"
        :options="religionOptions"
        required
      />
    </b-form-group>
    <b-form-group label="Pekerjaan">
      <b-form-input
        id="occupation"
        v-model="form.occupation"
      />
    </b-form-group>
    <b-form-group label="Meninggal di">
      <b-form-textarea
        id="death_location"
        v-model="form.death_location"
        required
      />
    </b-form-group>
    <b-form-group label="Meninggal pada tanggal dan jam">
      <r-datetime
        v-model="form.death_date"
      />
    </b-form-group>
    <b-form-group label="Waktu dihubungi jam">
      <b-time
        v-model="form.contact_time"
        :hour12="false"
      />
    </b-form-group>
    <b-form-group label="Jemput/tiba jam">
      <b-time
        v-model="form.pickup_time"
        :hour12="false"
      />
    </b-form-group>
    <b-form-group label="Lahir di tempat">
      <b-form-input
        id="birthplace"
        v-model="form.birthplace"
      />
    </b-form-group>
    <b-form-group label="Lahir tanggal">
      <b-form-datepicker
        id="birthdate"
        v-model="form.birthdate"
        required
      />
    </b-form-group>
    <b-form-group label="Alamat almarhum/ah">
      <b-form-textarea
        id="address"
        v-model="form.address"
        required
      />
    </b-form-group>
    <b-button type="button" @click="onFormNext">
      Lanjut ke data permintaan
    </b-button>
  </div>
</template>

<script>
import { religions } from '../../../constants/religions'
import RDatetime from '../../RDatetime'

export default {
  name: 'NPFDeathDetails',

  props: {
    form: {
      type: Object,
      required: true
    },
  },

  components: {
    RDatetime
  },

  data () {
    return {
      sexOptions: [
        { text: 'Pria', value: 1 },
        { text: 'Wanita', value: 2 },
      ],
      religionOptions: [
        { text: 'Tidak ada', value: religions.none },
        { text: 'Islam', value: religions.islam },
        { text: 'Kristen', value: religions.christian },
        { text: 'Katolik', value: religions.catholic },
        { text: 'Hindu', value: religions.hindu },
        { text: 'Buddha', value: religions.buddhist },
      ],
    }
  },

  methods: {
    onFormNext () {
      this.$router.push({ name: this.$path.nonPackage.form.requesterDetails })
    },
  },
}
</script>
