import { openDB } from '../db/openDB'
import { extractCustomerDataForList } from './lib'

const [route, action] = ['customers', 'list']

export const getAllCustomers = async function () {
  const response = await openDB()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const db = response.result

  const result = []

  const store = db.transaction(['customers'], 'readonly').objectStore('customers')

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        result.push(extractCustomerDataForList(cursor.value))
        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
