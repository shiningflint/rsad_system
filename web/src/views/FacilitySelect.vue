<template>
  <div>
    <h1 class="mb-5">Rumah duka ini adalah</h1>

    <b-container>
      <b-row>
        <b-col
          v-for="facility in facilities"
          :key="facility"
          class="d-flex justify-content-center"
        >
          <button
            type="button"
            class="box-decoration"
            style="width: 120px; height: 120px;"
            @click="onSelect(facility)"
          >
            {{ facilityLabel(facility) }}
          </button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import _get from 'lodash/get'
import { mapGetters } from 'vuex'
import { PATH } from '../routes/path'

export default {
  name: 'FacilitySelect',

  computed: {
    ...mapGetters({
      facilities: 'getFacilities',
      facilityTranslations: 'getFacilityTranslation',
    }),
  },

  methods: {
    async setFacility (facility) {
      localStorage.setItem('facility', facility)
      this.$store.dispatch('setStoreBranch', { value: facility })
      return true
    },
    onSelect (facility) {
      this.setFacility(facility)
      .then(() => {
        return this.$router.push({ name: PATH.home})
      })
    },
    facilityLabel (facility) {
      if (_get(this.facilityTranslations, facility)) {
        return this.facilityTranslations[facility]
      } else {
        return 'N/A'
      }
    },
  },
}
</script>
