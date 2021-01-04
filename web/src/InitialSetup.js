export class InitialSetup {
  constructor (store) {
    this.store = store
  }

  run = async () => {
    this._setAppFacility()
    return Promise.resolve(true)
  }

  // private

  _setAppFacility = () => {
    return this.store.dispatch(
      'setStoreBranch',
      { value: this._getAppFacility() }
    )
  }

  _getAppFacility = () => {
    return localStorage.getItem('facility') || null
  }
}
