const { locationDynamicHolder } = require('../db/reports')

const [route, action] = ['reports', 'location-dynamic']

export const getLocationDynamic = location => ({ status: 200, route, action, result: locationDynamicHolder()[location] })
