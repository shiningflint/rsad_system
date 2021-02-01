import _get from 'lodash/get'
import _snakeCase from 'lodash/snakeCase'
import { formatMoney } from '@/utilities/currency'
import { ClockWizard } from '@/lib/ClockWizard'
import { store } from '@/store'

export function NonPackage (printer) {
  const rsadLogo = store.getters.getLogoKristalian
  const clockWizard = new ClockWizard()
  const model = printer.model
  const methods = {
    buildFileName: () => {
      const today = clockWizard.todayDateString('yyyy_MM_dd')
      const name = _snakeCase(printer.model.death_record.name)

      return `${today}_${name}.pdf`
    },

    printHeader: () => {
      const imageWidth = 50
      const imageHeight = 27
      const centerImageHorizontalCursor = (printer.getPageWidth() / 2) - (imageWidth / 2)

      printer.setVerticalCursor(5)
      printer.setHorizontalCursor(centerImageHorizontalCursor)
      printer.insertImage(rsadLogo, "PNG", imageWidth, imageHeight)
      printer.resetHorizontalCursor()
    },

    printDeathRecord: (deathRecord, deathRecordLabel) => {
      printer.insertHeading(deathRecordLabel.title)

      Object.keys(deathRecord).forEach(key => {
        printer.insertNormalText(`${deathRecordLabel[key]}`, { noSpace: true })
        printer.setHorizontalCursor(70)
        printer.insertNormalText(`: ${deathRecord[key]}`)
        printer.resetHorizontalCursor()
      })
    },

    printRequester: (requester, requesterLabel) => {
      printer.insertHeading(requesterLabel.title)

      Object.keys(requester).forEach(key => {
        // TODO: I'm repeating a lot on setting dd dt, need a better solution
        if (key === 'phone_numbers') {
          if (!requester.phone_numbers.length) return

          printer.insertNormalText(`${requesterLabel[key].title}`, { noSpace: true })
          printer.setHorizontalCursor(70)
          printer.insertNormalText(': ', { noSpace: true })

          requester.phone_numbers.forEach(phoneNumber => {
            const phoneCursor = 72

            printer.setHorizontalCursor(phoneCursor)
            printer.insertNormalText(phoneNumber.number, { noSpace: true })
            printer.setHorizontalCursor(100)
            printer.insertNormalText(`(${ phoneNumber.variety })`)
            printer.setHorizontalCursor(phoneCursor)
          })

          printer.resetHorizontalCursor()
        } else {
          printer.insertNormalText(`${requesterLabel[key]}`, { noSpace: true })
          printer.setHorizontalCursor(70)
          printer.insertNormalText(`: ${requester[key]}`)
          printer.resetHorizontalCursor()
        }
      })
    },

    printPackageItemOrders: (packageItemOrders) => {
      const total = packageItemOrders
        .map(order => order.price)
        .reduce((acc, price) => acc + price)

      printer.insertHeading('Daftar Produk')

      packageItemOrders.forEach(order => {
        printer.insertNormalText(`${ order.text }`, { noSpace: true })
        printer.setHorizontalCursor(40)
        printer.insertNormalText(`: Rp${ formatMoney( order.price ) }`)
        printer.resetHorizontalCursor()
      })

      printer.insertSpacer(5)
      printer.insertNormalText(`Total`, { noSpace: true })
      printer.setHorizontalCursor(40)
      printer.insertNormalText(`: Rp${ formatMoney( total ) }`)
      printer.resetHorizontalCursor()
    },

    printSignature () {
      const spacer = 20
      const verticalSize = ( printer.getNormalFontSize() / 2 ) * 3 + spacer

      printer.setVerticalCursor(printer.getPageHeight() - verticalSize - 20)
      printer.insertNormalText('Tanda tangan yang bertanggung jawab:', { alignRight: true })
      printer.insertSpacer(spacer)
      printer.insertNormalText('....................................', { alignRight: true })
      printer.insertNormalText('Nama Jelas', { alignRight: true })
    },

    printFooter (pageNumber) {
      const footerCursor = printer.getPageHeight() - 7

      printer.setVerticalCursor(footerCursor)
      printer.insertNormalText(`Halaman ${pageNumber}`)
    },
  }

  // set title
  printer.setFileName(methods.buildFileName())

  // page 1 content

  methods.printHeader()

  if (_get(model, 'death_record')) {
    methods.printDeathRecord(model.death_record, model.label.death_record)
    printer.insertSpacer(20)
  }

  if (_get(model, 'requester')) {
    methods.printRequester(model.requester, model.label.requester)
  }

  methods.printSignature()

  // Skip printing the page
  // methods.printFooter(1)

  // page 2 content

  // Skip page 2 for later
  // const itemOrders = _get(model, 'package_item_orders')
  // if (itemOrders && itemOrders.length) {
  //   printer.newPage()

  //   methods.printHeader()
  //   methods.printPackageItemOrders(model.package_item_orders_object)
  //   methods.printFooter(2)
  // }

  return
}

