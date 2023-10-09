const { calculate } = require('../db/reports')

const [route, action] = ['reports', 'calculate']

export const calculateReport = async () => {
  const { result } = await calculate()

  return { status: 200, route, action, result }
}
