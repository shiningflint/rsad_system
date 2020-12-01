// refer to documentation: https://developers.google.com/sheets/api/quickstart/js#python-3.x

import { scriptLoader } from '../utilities/loader'
import _get from 'lodash/get'

export class GdriveManager {
  constructor (errorHandler) {
    // TODO: move client id & api key, script source to env variable
    this.errorHandler = errorHandler
    this.scriptSrc = process.env.VUE_APP_GOOGLE_SRC
    this.isOnline = _get(window, 'navigator.onLine')
    this.gapi = _get(window, 'gapi')
    this.clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID
    this.apiKey = process.env.VUE_APP_GOOGLE_API_KEY
    this.discoveryDocs = [process.env.VUE_APP_GOOGLE_DISCOVERY_DOCS]
    this.scope = 'https://www.googleapis.com/auth/spreadsheets.readonly'
    this.isSignedIn = false
  }

  run = () => {
    if (!this.isOnline) {
      return this.errorHandler('Tidak ada koneksi internet')
    }

    if (!this.gapi) {
      scriptLoader(this.scriptSrc, this._onScriptLoaded)
    } else if (this._isAuthenticated()) {
      console.log('already loaded and authenticated, good to go')
    }

    return
  }

  // private

  _onScriptLoaded = () => {
    this.gapi = window.gapi
    return this.gapi.load('client:auth2', this._initClient)
  }

  _initClient = () => {
    console.log('init client private function')
    const settings = {
      apiKey: this.apiKey,
      clientId: this.clientId,
      discoveryDocs: this.discoveryDocs,
      scope: this.scope
    }

    const onInitSuccess = () => {
      console.log('on init success!!! 🍌')
      this.gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateSigninStatus)
      this._updateSigninStatus(this._isAuthenticated())
    }

    const onInitError = (error) => {
      this.errorHandler(error)
    }

    return this.gapi.client.init(settings)
           .then(onInitSuccess, onInitError)
  }

  _isAuthenticated = () => {
    return this.gapi.auth2.getAuthInstance().isSignedIn.get()
  }

  _updateSigninStatus = (isSignedIn) => {
    return this.isSignedIn = isSignedIn
  }
}
