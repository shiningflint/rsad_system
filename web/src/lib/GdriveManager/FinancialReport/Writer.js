export class Writer {
  constructor (financialReport) {
    this.financialReport = financialReport
  }

  run = () => {
    // prepare requests array:
    // -- insert row data for rsad
    // -- insert row data for dy
    // send the requests to batch update in gdrive manager.
    console.log('starting writer')
  }
}
