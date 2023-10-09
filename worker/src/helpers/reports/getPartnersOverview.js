const { calculatePartnersOverview } = require('../db/reports')

const [route, action] = ['reports', 'get-partners-overview']

export const getPartnersOverview = async () => ({ status: 200, route, action, result: await calculatePartnersOverview() })
