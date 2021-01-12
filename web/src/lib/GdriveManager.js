// refer to documentation: https://developers.google.com/sheets/api/quickstart/js

import { FinancialReport } from './GdriveManager/FinancialReport'
import { ScriptInit } from './GdriveManager/ScriptInit'
import _get from 'lodash/get'

// GdriveManager will be responsible to:
// - load google API
// - Auth to google API using oauth2
// - Execute one strategy: (FinancialReport)
export class GdriveManager {
  constructor (errorHandler) {
    this.errorHandler = errorHandler
    this.gapi = _get(window, 'gapi')
    this.isSignedIn = false
    this.syncPayload = null
  }

  run = (syncPayload) => {
    if (!this._isOnline()) {
      return this.errorHandler('Tidak ada koneksi internet')
    }

    this.syncPayload = syncPayload

    if (!this.gapi) {
      const scriptInit = new ScriptInit(this)
      scriptInit.run()
    } else if (this._isAuthenticated()) {
      console.log('already loaded and authenticated, good to go')
      this._startSync()
    }

    return
  }

  setGapi= (gapi) => {
    return this.gapi = gapi
  }

  getGapi = () => {
    return this.gapi
  }

  onInitSuccess = () => {
    this.gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateSigninStatus)
    this._updateSigninStatus(this._isAuthenticated())
    this._startSync()
  }

  onInitError = (error) => {
    this.errorHandler(error)
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

  getSpreadsheet = (attrs) => {
    return this.gapi.client.sheets.spreadsheets.get(attrs)
  }

  // private

  _isOnline = () => {
    return _get(window, 'navigator.onLine')
  }

  _startSync = () => {
    console.log('start syncing')
    const financialReport = new FinancialReport(this, this.syncPayload)
    financialReport.run()
  }

  _isAuthenticated = () => {
    return this.gapi.auth2.getAuthInstance().isSignedIn.get()
  }

  _updateSigninStatus = (isSignedIn) => {
    return this.isSignedIn = isSignedIn
  }
}
