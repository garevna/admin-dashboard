import { openDB } from '../openDB'

const targets = {
  'Awaiting to be suspended': 'suspendedDate',
  'Awaiting for cancelation': 'canceledDate',
  'Awaiting to be resumed': 'resumedDate'
}

const statusUpdates = {
  'Awaiting to be suspended': 'Suspended',
  'Awaiting for cancelation': 'Canceled',
  'Awaiting to be resumed': 'Active'
}

const [route, action] = ['customers', 'services-to-update-status']

export const getServicesToUpdateStatus = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers'], 'readwrite')
  const customerStore = transaction.objectStore('customers')

  const currentDate = new Date().toISOString().slice(0, 10)

  return new Promise((resolve) => {
    const result = []
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = cursor.value
        if (Array.isArray(customer.services) && customer.services.length > 0) {
          const found = customer.services
            .filter(service => Object.keys(targets).includes(service.status))
            .filter(service => service[targets[service.status]] <= currentDate)
          if (found.length) {
            result.push(...found.map(item => ({
              customerId: customer._id,
              serviceId: item.id,
              currentStatus: item.status,
              newStatus: statusUpdates[item.status]
            })))
          }
        }
        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
