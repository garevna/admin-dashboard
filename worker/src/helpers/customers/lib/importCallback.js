import { getBuildingUniqueCode } from './getBuildingUniqueCode'

export const callback = (resolve, customers, buildings) => {
  customers.forEach(customer => {
    const index = buildings.findIndex(item => item?.address === customer.address)
    if (index !== -1) {
      Object.assign(customer, {
        buildingId: buildings[index].id,
        uniqueCode: `${getBuildingUniqueCode(buildings[index].addressComponents)}.${customer.apartmentNumber}`,
        postCode: customer.postCode || buildings[index].addressComponents.postCode
      })
    }
  })

  resolve({ status: 200, result: customers })
}
