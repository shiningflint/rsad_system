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

    <p v-show="v.form.package_item_orders.$error">
      Error: Harus ada minimal satu produk sebelum dilanjutkan
    </p>

    <b-button
      type="button"
      @click="onFormNext"
    >
      Lanjut ke data almarhum/ah
    </b-button>
  </div>
</template>

<script>
import { mixin } from '../mixin'

export default {
  name: 'NPFPackageItems',

  mixins: [mixin],

  methods: {
    packageItemOptions (category) {
      return this.packageItems
                 .filter(item => item.category === category)
    },
    onFormNext () {
      const invalid = (() => {
        const validator = this.v.form.package_item_orders
        validator.$touch()
        return validator.$invalid
      })()

      if (invalid) return

      this.$router.push({ name: this.$path.nonPackage.form.deathDetails })
    },
  },
}
</script>
