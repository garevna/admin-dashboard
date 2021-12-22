import { getBuildingUniqueCode } from './'

export const getGeneralBuildingData = function (data) {
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
