import Home from '../views/Home.vue'
import Orders from '../views/Orders/index.vue'
import OrdersShow from '../views/Orders/Show.vue'
import Package from '../views/Package.vue'
import NonPackage from '../views/NonPackage.vue'
import NonPackageForm from '../components/NonPackage/Form'
import NonPackageInvoice from '../components/NonPackage/Invoice'
import NonPackageConfirm from '../components/NonPackage/Confirm'
import NonPackageDone from '../components/NonPackage/Done'

export const routes = [
  { path: '/', component: Home },
  {
    path: '/orders',
    component: Orders,
  },
  {
    path: '/orders/:orderId',
    component: OrdersShow,
    name: 'OrdersShow',
    props: true,
  },
  { path: '/package', component: Package },
  {
    path: '/non_package',
    component: NonPackage,
    children: [
      {
        path: '',
        component: NonPackageForm,
      },
      {
        path: 'invoice',
        name: 'NonPackageInvoice',
        component: NonPackageInvoice,
      },
      {
        path: 'confirm',
        name: 'NonPackageConfirm',
        component: NonPackageConfirm,
      },
      {
        path: 'done',
        name: 'NonPackageDone',
        component: NonPackageDone,
      },
    ]
  },
]
