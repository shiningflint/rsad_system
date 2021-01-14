import _get from 'lodash/get'
import { religions, sexIsoToWord } from '../../constants/nonPackage'
import { ClockWizard } from '../../lib/ClockWizard'
import { store } from '../../store'

const _translators = {
  facility: (value) => {
    return store.getters.getFacilityTranslation[value]
  },
  sex: (value) => {
    return sexIsoToWord[value]
  },
  religion: (value) => {
    return religions[value].text
  },
  death_date: (value) => {
    const clockWizard = new ClockWizard()
    return clockWizard.jsonToDateTimeString(value)
  },
  contact_time: (value) => {
    return value.substring(0, 5)
  },
  pickup_time: (value) => {
    return value.substring(0, 5)
  },
}

export const translatedDeathRecord = (deathRecord) => {
  const result = {}

  for (const key in deathRecord) {
    const drValue = deathRecord[key]
    const needsTranslation = Object.keys(_translators).includes(key) && _get(deathRecord, key)

    if (needsTranslation) {
      result[key] = _translators[key](drValue)
    } else {
      result[key] = drValue
    }
  }

  return result
}
