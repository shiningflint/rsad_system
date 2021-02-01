import _get from 'lodash/get'
import { ClockWizard } from '@/lib/ClockWizard'

const monthTranslations = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

export class Payload {
  constructor () {
    this.clockWizard = new ClockWizard
  }

  digest = (syncPayload) => {
    if (!Array.isArray(syncPayload)) return

    const result = []

    for (const payload of syncPayload) {
      const createdDate = _get(payload, 'created_at')
      const facility = _get(payload, 'value.death_record.facility')
      const month = this._getMonth(createdDate)
      const year = this._getYear(createdDate)
      const valueDate = this.clockWizard.jsonToDateTimeString(createdDate, 'M/d/yyyy')
      const valueName = _get(payload, 'value.death_record.name')

      if (!this._isPayloadValid({ facility, month, year, valueDate, valueName })) continue

      const isSameMonthYear = result.find(o => {
        return o.month === month && o.year === year && o.facility === facility
      })

      if (isSameMonthYear) {
        isSameMonthYear.values.push({ date: valueDate, name: valueName })
      } else {
        result.push({
          month,
          year,
          facility: facility,
          values: [
            { date: valueDate, name: valueName, },
          ],
        })
      }
    }

    return result
  }

  // private

  _getMonth = (jsonDateString) => {
    const dateObj = this.clockWizard.jsonToDateObj(jsonDateString)

    return _get(monthTranslations, dateObj.getMonth(), null)
  }

  _getYear = (jsonDateString) => {
    const dateObj = this.clockWizard.jsonToDateObj(jsonDateString)

    return dateObj.getFullYear()
  }

  _isPayloadValid = ({ facility, month, year, valueDate, valueName }) => {
    return facility && month && year && valueDate && valueName
  }
}
