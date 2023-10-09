// const { createPartnersReport, calculatePartnersData } = require('../db/reports')

const [route, action] = ['reports', 'calculate-partners-data']

export const calculatePartners = async () => {
  // await createPartnersReport()
  // await calculatePartnersData()

  return { status: 200, route, action }
}
