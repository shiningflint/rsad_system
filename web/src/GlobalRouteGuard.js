import { store } from './store'
import _get from 'lodash/get'
import { PATH } from './routes/path'

export const setGlobalRouteGuard = (router) => {
  router.beforeEach((to, from, next) => {
    const fallbackPath = PATH.FacilitySelect
    const excludedRoutes = [ fallbackPath ]

    const isExcluded = excludedRoutes.includes( _get(to, 'name') )
    const isValidated = store.getters.getFacility

    if (isExcluded || isValidated) {
      return next()
    } else {
      return next({ name: fallbackPath })
    }
  })
}
