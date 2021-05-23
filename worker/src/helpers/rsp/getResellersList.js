import { getAllRecords } from '../db'

export const getResellersList = async () => {
  const [route, action] = ['rsp', 'list']

  const { status, result } = await getAllRecords('rsp')
  // self.postMessage({ status: 300, route, action, result })
  if (status !== 200) {
    return {
      status,
      route,
      action,
      error: true,
      errorType: 'Reseller\'s list',
      errorMessage: 'Unable to fetch the data from local DB'
    }
  }

  return { status, route, action, result }
}
