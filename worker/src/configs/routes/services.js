const { servicesController } = require('../../controllers').default

export const services = {
  refresh: servicesController.refresh,
  list: servicesController.list,
  table: servicesController.table,
  partner: servicesController.getPartnerServices,
  short: servicesController.shortList,
  names: servicesController.names,
  get: servicesController.get,
  search: servicesController.search,
  post: servicesController.post,
  put: servicesController.put,
  patch: servicesController.patch,
  'group-search': servicesController.groupSearch,
  'partial-search': servicesController.partialSearch,
  'patch-group': servicesController.patchGroup,
  delete: servicesController.deleteService,

  prices: servicesController.getPriceList,
  discounts: servicesController.getDiscountList,
  speeds: servicesController.getSpeedList,
  terms: servicesController.getTermsList,
  filters: servicesController.getFilters
}
