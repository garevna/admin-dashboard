import { openDB } from '../openDB'

const [route, action] = ['customers', 'excel']

export const getCustomersForExcel = async function (fields) {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers'/*, 'services' */], 'readwrite')
  const [customerStore/*, serviceStore */] = [
    transaction.objectStore('customers')
    // transaction.objectStore('services')
  ]

  return new Promise((resolve) => {
    const customers = []

    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = {}
        for (const key of fields) {
          switch (key) {
            case 'fullName':
              customer[key] = `${cursor.value.firstName} ${cursor.value.lastName}`
              break
            case 'address':
              customer[key] = `${cursor.value.apartmentNumber} ${cursor.value.address}`
              break
            case 'companyName':
              customer[key] = cursor.value.commercial ? cursor.value.commercial.companyName : ''
              break
            case 'companyAbn':
              customer[key] = cursor.value.commercial ? cursor.value.commercial.companyAbn : ''
              break
            default:
              customer[key] = cursor.value[key]
          }
        }
        customers.push(customer)
        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result: customers })
      }
    }
  })
}
