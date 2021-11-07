import { getBuildingUniqueCode } from './'

export const getGeneralBuildingData = function (data) {
  console.log('RECEIVED: ', data.uniqueCode)
  const {
    address,
    addressComponents,
    uniqueCode = getBuildingUniqueCode(data.addressComponents),
    coordinates,
    status,
    estimatedServiceDeliveryTime,
    inductionRequired,
    customerInstallApprovalRequired,
    buildingName,
    buildingType,
    numberOfDwellings,
    infrastructure,
    marketing
  } = data

  console.log('CREATED: ', uniqueCode)

  return {
    address,
    addressComponents,
    uniqueCode,
    coordinates,
    status,
    estimatedServiceDeliveryTime,
    inductionRequired,
    customerInstallApprovalRequired,
    buildingName,
    buildingType,
    numberOfDwellings,
    infrastructure,
    marketing
  }
}
