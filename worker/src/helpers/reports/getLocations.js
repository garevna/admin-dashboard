const { calculateLocations } = require('../db/reports')

const [route, action] = ['reports', 'locations']

export const getLocations = async () => {
  const { result } = await calculateLocations()

  return { status: 200, route, action, result }
}
