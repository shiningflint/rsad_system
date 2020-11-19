import Vue from 'vue'
import Vuex from 'vuex'
import { images } from './images'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    images,
  },
})
