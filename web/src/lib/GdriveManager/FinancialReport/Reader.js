import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import { isNumber } from '../../../utilities/type'

export class Reader {
  constructor (financialReport) {
    this.financialReport = financialReport
    this.yellowSeparator = null
    this.lastRowRsad = null
    this.lastRowDy = null
  }

  run = () => {
    const reportData = this.financialReport.reportData
    const rowData = _get(reportData, 'result.sheets.0.data.0.rowData')
    const startRow = _get(reportData, 'result.sheets.0.data.0.startRow')

    console.log(reportData)

    this._setYellowSeparator(rowData)
    console.log('yellow separator: ', this.yellowSeparator)
    this._setLastRowRsad()
    this._setLastRowDy(rowData, startRow)
  }

  // private

  // if no yellow separator, return null
  // if present, return the object
  _setYellowSeparator = (rowData) => {
    if (!rowData ||
        !rowData.length
       ) return this.yellowSeparator = null

    const colorColumns = rowData.map(data => {
      return _get(data, 'values.0.userEnteredFormat.backgroundColor')
    })

    const yellowCellRowIndex = colorColumns.findIndex(color => this._isYellow(color))

    return this.yellowSeparator = ( yellowCellRowIndex + 1 ) || null
  }

  _setLastRowRsad = () => {
    console.log('get last row rsad')
  }

  // The last row of the sheet is 'TOTAL'
  // return the last row - 1 of the sheet
  _setLastRowDy = (rowData, startRow) => {
    if (!rowData ||
        !rowData.length ||
        !startRow ||
        !isNumber(startRow)
       ) return this.lastRowDy = null

    return this.lastRowDy = rowData.length + startRow - 1
  }

  _isYellow = (colorObj) => {
    const yellow = {
      red: 1,
      green: 1,
    }

    return _isEqual(colorObj, yellow)
  }
}
