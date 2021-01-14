import {
  parseJSON,
  format,
  isValid,
  getYear,
} from 'date-fns'

export class ClockWizard {
  jsonToDateTimeString (jsonString, dateFormat = 'yyyy-MM-dd HH:mm' ) {
    if (!jsonString) return

    return format(parseJSON(jsonString), dateFormat)
  }

  jsonToDateObj (jsonString) {
    if (!jsonString) return

    return parseJSON(jsonString)
  }

  todayDateString (formatString) {
    return format(new Date(), formatString)
  }

  thisYear () {
    return getYear(new Date())
  }

  isValidDateString (isoDateString) {
    return isValid(new Date(isoDateString))
  }
}
