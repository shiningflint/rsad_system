// refer to documentation: https://developers.google.com/sheets/api/quickstart/js

import { scriptLoader } from '../utilities/loader'
import { FinancialReport } from './GdriveManager/FinancialReport'
import _get from 'lodash/get'

// GdriveManager will be responsible to:
// - load google API
// - Auth to google API using oauth2
// - Execute one strategy: (FinancialReport)
export class GdriveManager {
  constructor (errorHandler) {
    // TODO: move client id & api key, script source to env variable
    this.errorHandler = errorHandler
    this.scriptSrc = process.env.VUE_APP_GOOGLE_SRC
    this.gapi = _get(window, 'gapi')
    this.clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID
    this.apiKey = process.env.VUE_APP_GOOGLE_API_KEY
    this.discoveryDocs = ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    this.scope = 'https://www.googleapis.com/auth/spreadsheets'
    this.isSignedIn = false
  }

  run = () => {
    if (!this._isOnline()) {
      return this.errorHandler('Tidak ada koneksi internet')
    }

    if (!this.gapi) {
      scriptLoader(this.scriptSrc, this._onScriptLoaded)
    } else if (this._isAuthenticated()) {
      console.log('already loaded and authenticated, good to go')
      this._startSync()
    }

    return
  }

  login = () => {
    if (!this._isOnline()) {
      return this.errorHandler('Tidak ada koneksi internet')
    }

    this.gapi.auth2.getAuthInstance().signIn()
  }

  logout = () => {
    if (!this._isOnline()) {
      return this.errorHandler('Tidak ada koneksi internet')
    }

    this.gapi.auth2.getAuthInstance().signOut()
  }

  // private

  _isOnline = () => {
    return _get(window, 'navigator.onLine')
  }

  _startSync = () => {
    console.log('start syncing')
    const financialReport = new FinancialReport(this)
    financialReport.run()
  }

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
      this.gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateSigninStatus)
      this._updateSigninStatus(this._isAuthenticated())
      this._startSync()
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
