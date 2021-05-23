import { getRecordByKey } from '../db'
import { getCategoriesError } from '../error-handlers'

export const getCategories = async function () {
  const [route, action] = ['categories', 'get']

  const { status, result } = await getRecordByKey('categories', 'ticketsCategories')

  if (status !== 200) getCategoriesError(status)

  return {
    status,
    result,
    route,
    action
  }
}
