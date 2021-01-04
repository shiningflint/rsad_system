import Vue from 'vue'
import Vuex from 'vuex'
import { app } from './app'
import { images } from './images'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    app,
    images,
  },
})
