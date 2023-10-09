const { reportsController } = require('../../controllers').default

export const reports = {
  create: reportsController.createReport,
  calculate: reportsController.calculateReport,
  overview: reportsController.getOverview,

  'calculate-partners-data': reportsController.calculatePartners,
  'get-partner-data': reportsController.getPartnerData,
  'get-partners-overview': reportsController.getPartnersOverview,

  'get-buildings-by-postcode': reportsController.getBuildingsByPostCode,
  'get-building-data': reportsController.getBuildingData,
  'get-buildings-overview': reportsController.getBuildingsOverview,

  locations: reportsController.getLocations,
  'location-dynamic': reportsController.getLocationDynamicMRR,
  record: reportsController.getRecord
}
