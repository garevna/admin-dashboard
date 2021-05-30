export const customerHandler = (function () {
  let customerId = null
  return function (value) {
    if (!value) return customerId
    if (value === 'reset') {
      customerId = null
    } else {
      customerId = value
    }
  }
})()
