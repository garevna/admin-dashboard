export function changeUniqueCode (buildingUniqueCode) {
  const suffix = this.apartmentNumber ? `.${this.apartmentNumber}` : ''
  return `${this.partnerUniqueCode}.${buildingUniqueCode}${suffix}`
}
