const { buildingController } = require('../../controllers').default

export const building = {
  post: buildingController.post,
  patch: buildingController.patch,
  delete: buildingController.delete,
  excel: buildingController.excel,
  details: buildingController.getGroupOfBuildingsDetails,
  'master-list': buildingController.getMasterList,
  'get-buildings-by-postcode': buildingController.getBuildingsByPostCode
}
