import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { db } from './db'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './design/index.scss'
import './registerServiceWorker'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

const router = new VueRouter({ routes })

Vue.prototype.$db = db

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
