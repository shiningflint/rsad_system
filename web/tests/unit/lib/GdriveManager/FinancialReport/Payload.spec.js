import { Payload } from '../../../../../src/lib/GdriveManager/FinancialReport/Payload'
import {
  payloadOneInput,
  payloadOneOutput,
  payloadTwoInput,
  payloadTwoOutput,
  payloadThreeInput,
  payloadThreeOutput,
  payloadFourInput,
  payloadFourOutput,
} from './PayloadHelpers'

test('payload', () => {
  const payload = new Payload

  // simplest record, array of one data
  expect(payload.digest(payloadOneInput)).toStrictEqual(payloadOneOutput)
  // 2 records under the same month & year
  expect(payload.digest(payloadTwoInput)).toStrictEqual(payloadTwoOutput)
  // 2 records under the same month & year but different facility
  expect(payload.digest(payloadThreeInput)).toStrictEqual(payloadThreeOutput)
  // 1 record will not be added because it doesn't have a facility
  expect(payload.digest(payloadFourInput)).toStrictEqual(payloadFourOutput)
})
