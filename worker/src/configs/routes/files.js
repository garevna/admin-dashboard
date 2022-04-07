const { buildingController, servicesController } = require('../../controllers').default

export const files = {
  get: buildingController.getFileContent,
  create: buildingController.postFile,
  remove: buildingController.deleteFile,
  read: servicesController.readLocalFile
}
