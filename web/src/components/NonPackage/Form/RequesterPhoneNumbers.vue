<template>
  <div>
    <div v-for="(phone, index) in value" :key="index">
      <b-form-input
        :id="`number-${index}`"
        v-model="phone.number"
      />
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
      {{ phone }}
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
  },
}
</script>
