export const getGeneralBuildingData = function (data) {
  const {
    address,
    addressComponents,
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
