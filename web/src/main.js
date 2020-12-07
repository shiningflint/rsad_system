import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { routes } from './routes'
import { PATH } from './routes/path'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { IndexeddbManager} from './lib/IndexeddbManager'
import { store } from './store'
import { setGlobalRouteGuard } from './GlobalRouteGuard'
import { InitialSetup } from './InitialSetup'

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
setGlobalRouteGuard(router)

Vue.prototype.$localDb = new IndexeddbManager
Vue.prototype.$path = PATH

const initialStep = new InitialSetup(store)
initialStep.run()
.then(() => {
  new Vue({
    render: h => h(App),
    router,
    store: store
  }).$mount('#app')
})
