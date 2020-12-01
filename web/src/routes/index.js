import { PATH } from './path'
// import Home from '../views/Home.vue'
import FacilitySelect from '../views/FacilitySelect.vue'
import Info from '../views/Info.vue'
import Orders from '../views/Orders/index.vue'
import OrdersShow from '../views/Orders/Show.vue'
import Package from '../views/Package.vue'
import Sync from '../views/Sync.vue'
import NonPackage from '../views/NonPackage.vue'
import NonPackageForm from '../components/NonPackage/Form/index'
import NPFPackageItems from '../components/NonPackage/Form/PackageItems'
import NPFDeathDetails from '../components/NonPackage/Form/DeathDetails'
import NPFRequesterDetails from '../components/NonPackage/Form/RequesterDetails'
import NonPackageInvoice from '../components/NonPackage/Invoice'
import NonPackageConfirm from '../components/NonPackage/Confirm'
import NonPackageDone from '../components/NonPackage/Done'

export const routes = [
  // {
  //   path: '/',
  //   component: Home,
  //   name: PATH.home,
  // },
  {
    path: '/',
    name: PATH.home,
    redirect: {
      name: PATH.nonPackage.form.deathDetails,
    },
  },
  {
    path: '/info',
    component: Info,
    name: PATH.Info,
    meta: { showHeader: true },
  },
  {
    path: '/facility_select',
    component: FacilitySelect,
    name: PATH.FacilitySelect,
    meta: { showHeader: true },
  },
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
  {
    path: '/package',
    component: Package,
    meta: { showHeader: true },
  },
  {
    path: '/sync',
    component: Sync,
    meta: { showHeader: true },
  },
  {
    path: '/non_package',
    component: NonPackage,
    meta: { showHeader: true },
    children: [
      {
        path: 'form',
        name: PATH.nonPackage.form.index,
        component: NonPackageForm,
        children: [
          {
            path: 'package_items',
            component: NPFPackageItems,
            name: PATH.nonPackage.form.packageItems,
          },
          {
            path: 'death_details',
            component: NPFDeathDetails,
            name: PATH.nonPackage.form.deathDetails,
          },
          {
            path: 'requester_details',
            component: NPFRequesterDetails,
            name: PATH.nonPackage.form.requesterDetails,
          },
        ],
      },
      {
        path: 'invoice',
        name: PATH.nonPackage.invoice,
        component: NonPackageInvoice,
      },
      {
        path: 'confirm',
        name: PATH.nonPackage.confirm,
        component: NonPackageConfirm,
      },
      {
        path: 'done',
        name: PATH.nonPackage.done,
        component: NonPackageDone,
      },
    ],
  },
]
