<template>
  <div>
    <b-tabs fill>
      <b-tab title="Service" class="text-left p-3">
        <b-form-group>
          <b-form-checkbox-group
            id="service"
            v-model="form.package_item_orders"
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
            v-model="form.package_item_orders"
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
            v-model="form.package_item_orders"
            :options="packageItemOptions('product')"
            size="lg"
            stacked
          />
        </b-form-group>
      </b-tab>
    </b-tabs>

    <b-button type="button" @click="onFormNext">
      Lanjut ke data almarhum/ah
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'NPFPackageItems',

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
    packageItemOptions (category) {
      return this.packageItems
                 .filter(item => item.category === category)
    },
    onFormNext () {
      this.$router.push({ name: this.$path.nonPackage.form.deathDetails })
    },
  },
}
</script>
