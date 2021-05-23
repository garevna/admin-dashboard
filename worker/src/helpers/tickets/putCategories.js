import { put } from '../AJAX'

import { getFromRemoteServer, getCategories } from './'

import {
  putCategoriesError,
  refreshTicketsListError,
  getCategoriesError
} from '../error-handlers'

export const putCategories = async function (data) {
  const [route, action] = ['categories', 'put']

  self.postMessage({ status: 300, route, action, data })

  const { status, result } = await put('dictionary/ticket-categories', data)

  self.postMessage({ status: 300, route, action, result })

  if (status !== 200) putCategoriesError(status)

  const { status: refreshStatus } = await getFromRemoteServer()

  if (refreshStatus !== 200) return refreshTicketsListError(refreshStatus)

  const { status: getStatus } = await getCategories()

  if (getStatus !== 200) return getCategoriesError(getStatus)

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Ticket categories',
    messageText: 'Data updated'
  }
}
