const { reportsController } = require('../../controllers').default

export const reports = {
  create: reportsController.createReport,
  calculate: reportsController.calculateReport,
  overview: reportsController.getOverview,
  locations: reportsController.getLocations,
  record: reportsController.getRecord
}
