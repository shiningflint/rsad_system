<template>
  <b-form @submit.prevent="onSubmit">
    <b-tabs fill>
      <b-tab title="Service" class="text-left p-3">
        <b-form-group>
          <b-form-checkbox-group
            id="service"
            v-model="form.packageItemOrders"
            :options="packageItemOptions('service')"
            size="lg"
            stacked
          />
        </b-form-group>
      </b-tab>

      <b-tab title="Facility" class="text-left p-3">
        <b-form-group>
          <b-form-checkbox-group
            id="facility"
            v-model="form.packageItemOrders"
            :options="packageItemOptions('facility')"
            size="lg"
            stacked
          />
        </b-form-group>
      </b-tab>

      <b-tab title="Product" class="text-left p-3">
        <b-form-group>
          <b-form-checkbox-group
            id="product"
            v-model="form.packageItemOrders"
            :options="packageItemOptions('product')"
            size="lg"
            stacked
          />
        </b-form-group>
      </b-tab>
    </b-tabs>

    <b-button type="submit">Confirm</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'NonPackageForm',

  props: {
    form: {
      type: Object,
      required: true
    },
    packageItems: {
      type: Array,
      required: true
    },
  },

  methods: {
    onSubmit () {
      this.$router.push({ name: 'NonPackageInvoice' })
    },
    packageItemOptions (category) {
      return this.packageItems
                 .filter(item => item.category === category)
    },
  },
}
</script>
