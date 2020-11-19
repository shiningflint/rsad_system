import logoKristalian from '../assets/logo_kristalian.png'
import { toDataURL } from '../utilities/image'

export const images = {
  state: {
    logoKristalian: null,
  },
  getters: {
    getLogoKristalian (state) {
      return state.logoKristalian
    },
  },
  mutations: {
    setLogoKristalian (state, payload) {
      return state.logoKristalian = payload
    },
  },
  actions: {
    initImages ({ commit }) {
      return toDataURL(logoKristalian, (dataUrl) => {
        commit('setLogoKristalian', dataUrl)
      })
    },
  },
}
