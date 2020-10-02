import {
  parseJSON,
  format,
} from 'date-fns'

export class ClockWizard {
  jsonToDateTimeString (jsonString) {
    if (!jsonString) return

    return format( parseJSON(jsonString), 'yyyy-MM-dd HH:mm' )
  }

  todayDateString (formatString) {
    return format(new Date(), formatString)
  }
}
