let customerId = null

export const customerHandler = function (value) {
  if (!value) return customerId
  customerId = value === 'reset' ? null : value
}
