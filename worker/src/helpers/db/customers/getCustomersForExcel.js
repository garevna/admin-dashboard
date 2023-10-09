import { openDB } from '../openDB'
import { bindExcelFunctions } from './lib'

const [route, action] = ['customers', 'excel']

export const getCustomersForExcel = async function (options) {
  if (!options) return

  const { serviceStatus } = options

  const { testCustomer, getService, createCustomerFields } = await bindExcelFunctions(options)

  const { status, result: db } = await openDB()
  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services'], 'readwrite')
  const customerStore = transaction.objectStore('customers')

  return new Promise((resolve) => {
    const customers = []

    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        if (testCustomer(cursor.value)) {
          const customer = Object.assign({}, createCustomerFields(cursor.value))
          const services = cursor.value.services.filter(service => !serviceStatus || service.status === serviceStatus)

          for (const service of services) customers.push(Object.assign({}, customer, getService(service)))
        }
        cursor.continue()
      } else resolve({ status: 200, route, action, result: customers })
    }
  })
}
