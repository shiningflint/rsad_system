<template>
  <div>
    <b-form-group label="Jenis kelamin*">
      <b-form-radio-group
        id="sex"
        name="sex"
        v-model="form.death_record.sex"
        :options="sexOptions"
        :state="validateState('sex')"
      />
      <b-form-invalid-feedback
        :class="{ 'd-block': validateState('sex') === false }"
      >
        Jenis kelamin harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Nama lengkap*">
      <b-form-input
        id="name"
        v-model="form.death_record.name"
        @blur="validateAttribute('name')"
        :state="validateState('name')"
      />
      <b-form-invalid-feedback>
        Nama harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Agama*">
      <b-form-select
        id="religion"
        v-model="form.death_record.religion"
        :options="religionOptions"
        :state="validateState('religion')"
      />
      <b-form-invalid-feedback>
        Agama harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Pekerjaan">
      <b-form-input
        id="occupation"
        v-model="form.death_record.occupation"
      />
    </b-form-group>

    <b-form-group label="Meninggal di*">
      <b-form-textarea
        id="death_location"
        v-model="form.death_record.death_location"
        :state="validateState('death_location')"
      />
      <b-form-invalid-feedback>
        Lokasi harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Meninggal pada tanggal dan jam*">
      <r-datetime
        v-model="form.death_record.death_date"
        :state="validateState('death_date')"
      />
      <b-form-invalid-feedback
        :class="{ 'd-block': validateState('death_date') === false }"
      >
        Tanggal dan jam harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Waktu dihubungi jam">
      <b-time
        v-model="form.death_record.contact_time"
        :hour12="false"
      />
    </b-form-group>

    <b-form-group label="Jemput/tiba jam">
      <b-time
        v-model="form.death_record.pickup_time"
        :hour12="false"
      />
    </b-form-group>

    <b-form-group label="Lahir di tempat">
      <b-form-input
        id="birthplace"
        v-model="form.death_record.birthplace"
      />
    </b-form-group>

    <b-form-group label="Lahir tanggal*">
      <b-form-datepicker
        id="birthdate"
        v-model="form.death_record.birthdate"
        :state="validateState('birthdate')"
      />
      <b-form-invalid-feedback>
        Tanggal harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Alamat almarhum/ah*">
      <b-form-textarea
        id="address"
        v-model="form.death_record.address"
        :state="validateState('address')"
      />
      <b-form-invalid-feedback>
        Alamat harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <p v-show="v.form.death_record.$error">
      Error: Ada kesalahan dalam formulir, cek di atas
    </p>

    <b-button type="button" @click="onFormNext">
      Lanjut ke data permintaan
    </b-button>
  </div>
</template>

<script>
import { religions } from '../../../constants/religions'
import RDatetime from '../../RDatetime'
import { mixin } from './mixin'

export default {
  name: 'NPFDeathDetails',

  mixins: [mixin],

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
    validateState (attribute) {
      const { $dirty, $error } = this.v.form.death_record[attribute]
      return $dirty ? !$error : null
    },
    validateAttribute (attribute) {
      return this.v.form.death_record[attribute].$touch()
    },
    onFormNext () {
      const invalid = (() => {
        const validator = this.v.form.death_record
        validator.$touch()
        return validator.$invalid
      })()

      if (invalid) return

      this.$router.push({ name: this.$path.nonPackage.form.requesterDetails })
    },
  },
}
</script>
