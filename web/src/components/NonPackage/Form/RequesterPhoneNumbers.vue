<template>
  <div>
    <div
      v-for="(phone, index) in value"
      :key="index"
      class="mb-3"
    >
      <b-form-input
        :id="`number-${index}`"
        v-model="phone.number"
        :state="validateState(index, 'number')"
      />
      <b-form-invalid-feedback>
        Nomor telpon harus diisi
      </b-form-invalid-feedback>
      <b-form-select
        :id="`variety-${index}`"
        v-model="phone.variety"
        :options="varietyOptions"
      />
      <b-button
        type="button"
        @click="onRemovePhoneNumber(index)"
      >
        Hapus nomor ini
      </b-button>
    </div>

    <b-button
      type="button"
      @click="onAddPhoneNumber"
    >
      Tambah nomor kontak
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'RequesterPhoneNumbers',

  props: {
    value: {
      type: Array,
      required: true,
    },
    v: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      varietyOptions: [
        { text: 'Telepon', value: 'landline' },
        { text: 'Handphone', value: 'mobile' },
      ]
    }
  },

  methods: {
    onAddPhoneNumber () {
      const emptyPhoneNumber = { number: '', variety: 'mobile' }
      const newValue = [ ...this.value, emptyPhoneNumber ]
      this.$emit('input', newValue)
    },
    onRemovePhoneNumber (index) {
      const newValue = this.value.filter((item, itemIndex) => itemIndex !== index)
      this.$emit('input', newValue)
    },
    validateState (index, attribute) {
      const { $dirty, $error } = this.v.$each[index][attribute]
      return $dirty ? !$error : null
    },
  },
}
</script>
