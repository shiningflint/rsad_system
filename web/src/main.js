import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { routes } from './routes'
import { PATH } from './routes/path'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { db } from './db'
import { store } from './store'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './design/index.scss'
import './registerServiceWorker'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuelidate)
Vue.config.productionTip = false

const router = new VueRouter({ routes })

Vue.prototype.$db = db
Vue.prototype.$path = PATH

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app')
