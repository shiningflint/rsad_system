const facilities = [ 'rsad', 'dy' ]
const facilityTranslations = {
  rsad: "RSAD",
  dy: "Dharma Yadnya",
}

export const app = {
  state: {
    facility: null,
    facilities,
    facilityTranslations,
  },
  getters: {
    getFacility (state) {
      return state.facility
    },
    getFacilities (state) {
      return state.facilities
    },
    getFacilityTranslation (state) {
      return state.facilityTranslations
    },
  },
  mutations: {
    setStoreBranch (state, value) {
      return state.facility = value
    },
  },
  actions: {
    setStoreBranch ({ commit, state }, { value }) {
      const isValidStoreBranch = state.facilities.includes(value)

      if (isValidStoreBranch) {
        return commit('setStoreBranch', value)
      } else {
        return commit('setStoreBranch', null)
      }
    },
  },
}
