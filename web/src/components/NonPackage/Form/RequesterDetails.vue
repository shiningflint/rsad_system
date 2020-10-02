<template>
  <div>
    <b-form-group :label="requesterLabel.name">
      <b-form-input
        id="name"
        v-model="form.requester.name"
        :state="validateState('name')"
      />
      <b-form-invalid-feedback>
        {{ requesterLabel.name }} harus diisi
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group :label="requesterLabel.address">
      <b-form-textarea
        id="address"
        v-model="form.requester.address"
        :state="validateState('address')"
      />
      <b-form-invalid-feedback>
        {{ requesterLabel.address }} harus diisi
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group :label="requesterLabel.email">
      <b-form-input
        id="email"
        v-model="form.requester.email"
      />
    </b-form-group>
    <b-form-group :label="requesterLabel.phone_numbers.title">
      <requester-phone-numbers
        v-model="form.requester.phone_numbers"
        :v="v.form.requester.phone_numbers"
      />
      <b-form-invalid-feedback
        :class="{ 'd-block': validateState('phone_numbers') === false }"
      >
        {{ requesterLabel.phone_numbers.title }} harus minimal satu
      </b-form-invalid-feedback>
    </b-form-group>
  </div>
</template>

<script>
import RequesterPhoneNumbers from './RequesterPhoneNumbers'
import { mixin } from './mixin'

export default {
  name: 'NPFRequesterDetails',

  mixins: [mixin],

  components: {
    RequesterPhoneNumbers,
  },

  computed: {
    requesterLabel () {
      return this.formLabel.requester
    },
  },

  methods: {
    validateState (attribute) {
      const { $dirty, $error } = this.v.form.requester[attribute]
      return $dirty ? !$error : null
    },
  },
}
</script>
