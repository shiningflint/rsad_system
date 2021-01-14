import { Reader } from './FinancialReport/Reader'
import { Writer } from './FinancialReport/Writer'
import { Payload } from './FinancialReport/Payload'

// FinancialReport is responsible for
// Take order data and insert to google sheet rows
// TODO: Separate to subclass Reader and Writer
export class FinancialReport {
  constructor (manager, syncPayload) {
    this.manager = manager
    this.syncPayload = syncPayload
    this.reader = new Reader(this)
    this.writer = new Writer(this)
    this.sheetId = process.env.VUE_APP_GOOGLE_SHEET_ID
    this.reportData = null
    this.writeData = null
    this.startRow = null
    this.cellColors = {
      black: {
        red: 0,
        green: 0,
        blue: 0,
      },
      grey: {
        red: 0.85490197,
        green: 0.85490197,
        blue: 0.85490197,
      },
      green: {
        red: 0.7725490196078432,
        green: 0.8784313725490196,
        blue: 0.7019607843137254,
      },
      yellow: {
        red: 1,
        green: 1,
      },
      pastelYellow: {
        red: 1,
        green: 0.8980392156862745,
        blue: 0.596078431372549,
      },
    }
    this.cellBorders = {
      allSideBlack: {
        top: { style: 'SOLID', color: this.cellColors.black },
        bottom: { style: 'SOLID', color: this.cellColors.black },
        right: { style: 'SOLID', color: this.cellColors.black },
        left: { style: 'SOLID', color: this.cellColors.black },
      },
    }
  }

  // Get the spreadsheet
  // Insert row on each saved indexed data to branch A
  // Insert row on each saved indexed data to branch B
  run = () => {
    const payload = new Payload
    this.writeData = payload.digest(this.syncPayload)

    const month = 'May'
    const firstColumn = '1'
    const maxColumn = '500'

    this.manager.getSpreadsheet({
      spreadsheetId: this.sheetId,
      ranges: `${month}!A${firstColumn}:A${maxColumn}`,
      includeGridData: true,
    }).then((response) => {
      this.reportData = response
      return this.reader.run()

      // this._insertRowData()
    }).then(() => {
      this.writer.run()
    })
  }

  // private

  _insertRowData = () => {
    console.log('inserting row data', this.manager.gapi.client.sheets.spreadsheets.batchUpdate)
    let requests = []

    requests.push({
      insertRange: {
        range: {
          sheetId: 1607816803,
          startRowIndex: 94,
          endRowIndex: 98,
        },
        shiftDimension: 'ROWS'
      },
    })

    // Update cell request API reference https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#updatecellsrequest
    // Cell API reference https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
    requests.push({
      updateCells: {
        rows: [
          this._recordRow(),
          this._recordRow(),
          this._recordRow(),
        ],
        fields: '*',
        range: {
          sheetId: 1607816803,
          startRowIndex: 94,
          endRowIndex: 98,
        },
      },
    })

    const batchUpdateRequest = { requests: requests }

    this.manager.gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.sheetId,
      resource: batchUpdateRequest,
    }).then((response) => {
      console.log('insert row data response', response)
    })
  }

  // Record row is the grey, green, and yellow-ish colors with names and price values
  _recordRow = () => {
    const rightSideEmpty = () => {
      const colors = [
        'green',
        'green',
        'pastelYellow',
        'green',
        'pastelYellow',
        'pastelYellow',
        'green',
        'pastelYellow',
        'pastelYellow',
        'green',
        'pastelYellow',
        'pastelYellow',
        'green',
        'pastelYellow',
        'pastelYellow',
        'grey',
      ]

      return colors.map(c => {
        return {
          userEnteredFormat: {
            backgroundColor: this.cellColors[c],
            borders: this.cellBorders.allSideBlack,
          },
        }
      })
    }

    return {
      values: [
        {
          userEnteredValue: {
            stringValue: 'bananas',
          },
          userEnteredFormat: {
            backgroundColor: this.cellColors.grey,
            borders: this.cellBorders.allSideBlack,
          },
        },
        {
          userEnteredValue: {
            stringValue: 'potatoes',
          },
          userEnteredFormat: {
            backgroundColor: this.cellColors.grey,
            borders: this.cellBorders.allSideBlack,
          },
        },
        {
          userEnteredValue: {
            stringValue: 'bacon',
          },
          userEnteredFormat: {
            backgroundColor: this.cellColors.grey,
            borders: this.cellBorders.allSideBlack,
          },
        },
        ...rightSideEmpty(),
      ],
    }
  }
}
