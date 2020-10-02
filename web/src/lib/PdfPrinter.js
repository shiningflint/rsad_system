import _get from 'lodash/get'
import { jsPDF } from 'jspdf'
import { NonPackage } from './PdfPrinter/NonPackage'

const contentStrategies = { NonPackage }

export class PdfPrinter {
  constructor (model, contentName) {
    const options = {
      format: 'a4'
    }
    this.horizontalPadding = 10
    this.normalFontSize = 10

    this.model = model
    this.doc = new jsPDF(options)
    this.fileName = 'default.pdf'
    this.content = contentStrategies[contentName]
    this.verticalCursor = 14
    this.horizontalCursor = this.horizontalPadding
  }

  press () {
    this.content(this)
    this.doc.save(this.fileName)
  }

  getNormalFontSize () {
    return this.normalFontSize
  }

  getPageWidth () {
    return this.doc.internal.pageSize.getWidth()
  }

  getPageHeight () {
    return this.doc.internal.pageSize.getHeight()
  }

  insertImage (image, imageType, width, height) {
    this.doc.addImage(
      image,
      imageType,
      this.horizontalCursor,
      this.verticalCursor,
      width,
      height
    )
    this._moveCursorDown(height + 20)
  }

  insertHeading (text) {
    const headingFontSize = 20

    if (this.doc.getFontSize() !== headingFontSize) {
      this.doc.setFontSize(headingFontSize)
    }
    this.doc.text(text, this.horizontalCursor, this.verticalCursor)

    this._moveCursorDown(headingFontSize / 3)
  }

  // options
  // - noSpace: boolean
  // - alignRight: boolean
  insertNormalText (text, options = {}) {
    if (this.doc.getFontSize() !== this.normalFontSize) {
      this.doc.setFontSize(this.normalFontSize)
    }

    if (_get(options, 'alignRight')) {
      const originalHorizontalCursor = this.horizontalCursor

      this.horizontalCursor = this.getPageWidth() - this._calculateTextWidth(text) - this.horizontalPadding
      this.doc.text(text, this.horizontalCursor, this.verticalCursor)
      this.horizontalCursor = originalHorizontalCursor
    } else {
      this.doc.text(text, this.horizontalCursor, this.verticalCursor)
    }

    if (_get(options, 'noSpace')) return

    this._moveCursorDown(this.normalFontSize / 2)
  }

  insertSpacer (value) {
    this._moveCursorDown(value)
  }

  newPage () { this.doc.addPage() }

  setFileName (name) {
    this.fileName = name
  }

  setHorizontalCursor (value) {
    this.horizontalCursor = value
  }

  setVerticalCursor (value) {
    this.verticalCursor = value
  }

  resetHorizontalCursor () {
    this.horizontalCursor = this.horizontalPadding
  }

  // private
  _moveCursorDown (value) {
    this.verticalCursor = this.verticalCursor + value
  }

  _calculateTextWidth (text) {
    return this.doc.getStringUnitWidth(text) * this.doc.getFontSize() / (72/25.6)
  }
}
