import { overview } from '../db/reports'

// const [route, action] = ['reports', 'overview']

export const getReportsOverview = async () => await overview()

// export const getReportsOverview = async () => {
//   const { result } = await overview()
//   return { status: 200, route, action, result }
// }
