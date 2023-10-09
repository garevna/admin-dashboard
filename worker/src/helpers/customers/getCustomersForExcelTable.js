import { getCustomersForExcel } from '../db'

const [route, action] = ['customers', 'excel']

export const getCustomersForExcelTable = async function (data) {
  const { status, result } = await getCustomersForExcel(data)

  if (status !== 200) return self.errorMessage('getCustomerDataError')

  return { status, route, action, result }
}
