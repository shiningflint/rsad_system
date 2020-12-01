import { scriptLoader } from '../utilities/loader'
import _get from 'lodash/get'

export class GdriveManager {
  constructor (errorHandler) {
    this.errorHandler = errorHandler
    this.scriptSrc =  'https://apis.google.com/js/api.js'
    this.isOnline = _get(window, 'navigator.onLine')
    this.gapi = _get(window, 'gapi')
  }

  run () {
    if (!this.isOnline) {
      return this.errorHandler('Tidak ada koneksi internet')
    }

    if (!this.gapi) {
      const onLoadHandler = () => { this.gapi = window.gapi }
      scriptLoader(this.scriptSrc, onLoadHandler)
    }

    return
  }
}
