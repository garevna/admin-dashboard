export function getDiscountPeriodStartDate () {
  return Date.parse(this.services[this.serviceIndex].activationDate || this.customerCreationDate || new Date().toISOString().slice(0, 10))
}
