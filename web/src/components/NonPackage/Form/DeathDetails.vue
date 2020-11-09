<template>
  <div>
    <b-form-group :label="deathRecordLabel.sex">
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
        {{ deathRecordLabel.sex }} harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="deathRecordLabel.name">
      <b-form-input
        id="name"
        v-model="form.death_record.name"
        @blur="validateAttribute('name')"
        :state="validateState('name')"
      />
      <b-form-invalid-feedback>
        {{ deathRecordLabel.name }} harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="deathRecordLabel.religion">
      <b-form-select
        id="religion"
        v-model="form.death_record.religion"
        :options="religionOptions"
        :state="validateState('religion')"
      />
      <b-form-invalid-feedback>
        {{ deathRecordLabel.religion }} harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="deathRecordLabel.occupation">
      <b-form-input
        id="occupation"
        v-model="form.death_record.occupation"
      />
    </b-form-group>

    <b-form-group :label="deathRecordLabel.death_location">
      <b-form-textarea
        id="death_location"
        v-model="form.death_record.death_location"
        :state="validateState('death_location')"
      />
      <b-form-invalid-feedback>
        Lokasi harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="deathRecordLabel.death_date">
      <r-datetime
        v-model="form.death_record.death_date"
        :state="validateState('death_date')"
        :minutes-step="10"
      />
      <b-form-invalid-feedback
        :class="{ 'd-block': validateState('death_date') === false }"
      >
        {{ deathRecordLabel.death_date }} harus diisi
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="deathRecordLabel.contact_time">
      <b-time
        v-model="form.death_record.contact_time"
        :minutes-step="10"
        :hour12="false"
      />
    </b-form-group>

    <b-form-group :label="deathRecordLabel.pickup_time">
      <b-time
        v-model="form.death_record.pickup_time"
        :minutes-step="10"
        :hour12="false"
      />
    </b-form-group>

    <b-form-group :label="deathRecordLabel.birthplace">
      <b-form-input
        id="birthplace"
        v-model="form.death_record.birthplace"
      />
    </b-form-group>

    <b-form-group
      :label="deathRecordLabel.birthdate"
      :state="validateState('birthdate')"
      invalid-feedback='Tanggal harus diisi'
    >
      <dropdown-datepicker
        id="birthdate"
        v-model="form.death_record.birthdate"
        :yearStart="birthDateYearStart()"
        :yearEnd="birthDateYearEnd()"
      />
    </b-form-group>

    <b-form-group :label="deathRecordLabel.address">
      <b-form-textarea
        id="address"
        v-model="form.death_record.address"
        :state="validateState('address')"
      />
      <b-form-invalid-feedback>
        {{ deathRecordLabel.address }} harus diisi
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
import { religions, sexIsoToWord } from '../../../constants/nonPackage'
import RDatetime from '../../RDatetime'
import DropdownDatepicker from '../../DropdownDatepicker'
import { mixin } from './mixin'
import { ClockWizard } from '../../../lib/ClockWizard'

export default {
  name: 'NPFDeathDetails',

  mixins: [mixin],

  components: {
    RDatetime,
    DropdownDatepicker,
  },

  data () {
    return {
      sexOptions: [
        { text: sexIsoToWord[1], value: 1 },
        { text: sexIsoToWord[2], value: 2 },
      ],
      religionOptions: [
        { text: religions.none.text, value: religions.none.value },
        { text: religions.islam.text, value: religions.islam.value },
        { text: religions.christian.text, value: religions.christian.value },
        { text: religions.catholic.text, value: religions.catholic.value },
        { text: religions.hindu.text, value: religions.hindu.value },
        { text: religions.buddhist.text, value: religions.buddhist.value },
      ],
    }
  },

  computed: {
    deathRecordLabel () {
      return this.formLabel.death_record
    },
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
    birthDateYearStart () {
      const clockWizard = new ClockWizard()
      return clockWizard.thisYear() - 100
    },
    birthDateYearEnd () {
      const clockWizard = new ClockWizard()
      return clockWizard.thisYear()
    },
  },
}
</script>
