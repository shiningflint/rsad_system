import { scriptLoader } from '../../utilities/loader'

export class ScriptInit {
  constructor (manager) {
    this.manager = manager
    this.scriptSrc = process.env.VUE_APP_GOOGLE_SRC
    this.clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID
    this.apiKey = process.env.VUE_APP_GOOGLE_API_KEY
    this.discoveryDocs = ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    this.scope = 'https://www.googleapis.com/auth/spreadsheets'
  }

  run = () => {
    scriptLoader(this.scriptSrc, this._onScriptLoaded)
  }

  // private

  _onScriptLoaded = () => {
    this.manager.setGapi(window.gapi)
    const gapi = this.manager.getGapi()
    gapi.load('client:auth2', this._initClient)
  }

  _initClient = () => {
    console.log('init client private function')
    const gapi = this.manager.getGapi()
    const settings = {
      apiKey: this.apiKey,
      clientId: this.clientId,
      discoveryDocs: this.discoveryDocs,
      scope: this.scope
    }

    return gapi.client.init(settings)
           .then(this.manager.onInitSuccess, this.manager.onInitError)
  }
}
