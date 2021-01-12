<template>
  <div>
    <p>
      <span class="mr-3">Fasilitas: {{ facilityTranslations[facility] }}</span>
      <button type="button" @click="onChangeFacility">Ganti</button>
    </p>
    <p>Versi: {{ version }} </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Info',

  computed: {
    ...mapGetters({
      facility: 'getFacility',
      facilityTranslations: 'getFacilityTranslation',
    }),
    version () {
      // refer to https://stackoverflow.com/questions/42155115/how-to-include-git-revision-into-angular-cli-application#answer-57533451
      return window.version
    },
  },

  methods: {
    onChangeFacility () {
      this.$router.push({ name: this.$path.FacilitySelect })
    },
  },
}
</script>
