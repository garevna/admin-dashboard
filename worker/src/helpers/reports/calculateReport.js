import { calculate } from '../db/reports'

const [route, action] = ['reports', 'calculate']

export const calculateReport = async () => {
  // await self.createReport(list)

  const { result } = await calculate()

  return { status: 200, route, action, result }
}
