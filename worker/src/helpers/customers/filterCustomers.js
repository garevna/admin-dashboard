import { openDB } from '../db/openDB'
import {
  bindSearchFunctions,
  filtersChanged,
  filteredHandler
} from './lib'

// const [route, action] = ['customers', 'filter']

export const filterCustomers = async function (filters) {
  if (!filtersChanged(filters)) return filteredHandler()

  const testCustomer = bindSearchFunctions(filters || {})

  const { result: db } = await openDB()

  // if (status !== 200) return { status, result: db, route, action }

  const customerStore = db
    .transaction(['customers'], 'readonly')
    .objectStore('customers')

  const index = customerStore.index('customerCreationDate')

  if (!Object.keys(filters || {}).length) {
    return new Promise(resolve => Object.assign(customerStore.getAllKeys(), {
      onsuccess: event => {
        filteredHandler(event.target.result)
        resolve(event.target.result)
      }
    }))
  }

  const result = []

  return new Promise((resolve) => {
    index.openCursor()
      .onsuccess = event => {
        const cursor = event.target.result
        if (cursor) {
          if (testCustomer(cursor.value)) result.unshift(cursor.value._id)
          cursor.continue()
        } else {
          filteredHandler(result)
          resolve(result)
        }
      }
  })
}
