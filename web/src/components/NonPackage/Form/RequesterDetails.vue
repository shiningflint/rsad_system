<template>
  <div>
    <b-form-group label="Nama">
      <b-form-input
        id="name"
        v-model="form.requester.name"
        required
      />
    </b-form-group>
    <b-form-group label="Alamat">
      <b-form-textarea
        id="address"
        v-model="form.requester.address"
        required
      />
    </b-form-group>
    <b-form-group label="No. Telepon">
      <requester-phone-numbers
        v-model="form.requester.phone_numbers"
      />
    </b-form-group>
  </div>
</template>

<script>
import RequesterPhoneNumbers from './RequesterPhoneNumbers'

export default {
  name: 'NPFRequesterDetails',

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  components: {
    RequesterPhoneNumbers,
  },
}
</script>
