const { servicesController } = require('../../controllers').default

export const sla = {
  list: servicesController.getSLAList,
  get: servicesController.getSLAContent,
  put: servicesController.updateSLA,
  update: servicesController.updateSLA,
  upload: servicesController.uploadSLA,
  create: servicesController.createNewSLA,
  post: servicesController.uploadNewSLA,
  remove: servicesController.removeSLA,
  read: servicesController.readLocalFile
}
