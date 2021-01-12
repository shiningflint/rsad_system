import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'

export class Reader {
  constructor (financialReport) {
    this.financialReport = financialReport
    this.sheetState = null
    this.yellowSeparator = null
    this.lastRowRsad = null
    this.lastRowDy = null
  }

  run = () => {
    const reportData = this.financialReport.reportData
    const rowData = _get(reportData, 'result.sheets.0.data.0.rowData')

    console.log(reportData)

    this._setSheetState(rowData)

    if (this.sheetState) this.sheetState(rowData)

    console.log('yellow separator: ', this.yellowSeparator)
    console.log('last row rsad', this.lastRowRsad)
    console.log('last row dy', this.lastRowDy)
  }

  // private

  // Read the state of the sheet.
  // return the sheet state strategy
  // return [function]
  _setSheetState = (rowData) => {
    const isSheetBlank = !rowData || !rowData.length
    if (isSheetBlank) return this.sheetState = this._sheetBlank

    this._setYellowSeparator(rowData)

    const isRsadOnly = rowData && rowData.length && !this.yellowSeparator
    if (isRsadOnly) return this.sheetState = this._sheetRsadOnly

    const isRsadDy = rowData && rowData.length && this.yellowSeparator
    if (isRsadDy) return this.sheetState = this._sheetRsadDy

    return this.sheetState = null
  }

  // current states = 3
  // blank, rsad only, both rsad & dy
  _sheetBlank = () => {
    this.lastRowRsad = 1
    this.lastRowDy = null
  }

  _sheetRsadOnly = (rowData) => {
    this.lastRowRsad = this._getLastRowRsad(rowData)
    this.lastRowDy = null
  }

  _sheetRsadDy = (rowData) => {
    this.lastRowRsad = this._getLastRowRsad(rowData)
    this.lastRowDy = this._getLastRowDy(rowData)
  }

  _setYellowSeparator = (rowData) => {
    const colorColumns = rowData.map(data => {
      return _get(data, 'values.0.userEnteredFormat.backgroundColor')
    })

    const yellowCellRowIndex = colorColumns.findIndex(color => this._isYellow(color))

    return this.yellowSeparator = ( yellowCellRowIndex + 1 ) || null
  }

  _isYellow = (colorObj) => {
    const yellow = {
      red: 1,
      green: 1,
    }

    return _isEqual(colorObj, yellow)
  }

  _getLastRowRsad = (rowData) => {
    if (this.yellowSeparator) {
      return this.yellowSeparator
    } else {
      const value = this._lastGreyIndex(rowData)
      return value ? value + 2 : null
    }
  }

  _getLastRowDy = (rowData) => {
    return rowData.length
  }

  _lastGreyIndex = (rowData) => {
    const gray = {
      red: 0.85490197,
      green: 0.85490197,
      blue: 0.85490197,
    }

    const colorColumns = rowData
      .map((data, index) => {
        const d = _get(data, 'values.0.userEnteredFormat.backgroundColor')
        return { ...d, index }
      })
      .filter(data => {
        return (
          data['red'] === gray['red'] &&
          data['green'] === gray['green'] &&
          data['blue'] === gray['blue']
        )
      })

    return colorColumns.slice(-1)[0]['index']
  }
}
