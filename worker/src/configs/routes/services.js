const { servicesController } = require('../../controllers').default

export const services = {
  refresh: servicesController.refresh,
  list: servicesController.list,
  short: servicesController.shortList,
  names: servicesController.names,
  get: servicesController.get,
  search: servicesController.search,
  post: servicesController.post,
  put: servicesController.put,
  patch: servicesController.patch,
  'group-search': servicesController.groupSearch,
  'patch-group': servicesController.patchGroup,
  delete: servicesController.deleteService
}
