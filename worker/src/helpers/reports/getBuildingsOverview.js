import { calculateBuildingsOverview } from '../db/reports/buildings'

const [route, action] = ['reports', 'get-buildings-overview']

export const getBuildingsOverview = async () => {
  const { status, result } = await calculateBuildingsOverview()

  return { status, route, action, result }
}
