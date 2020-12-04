export const isStringNumber = (value) => {
  const number = Number(value)
  return isNumber(number)
}

export const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value)
}
