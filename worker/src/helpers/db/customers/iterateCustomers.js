import { openDB } from '../openDB'
import { putRecord } from './'
import { clearStore } from '../'

const testBooking = service => self.serviceStatus.test(service.status, 'booking')
const testSchedule = service => self.serviceStatus.test(service.status, 'scheduling')
// const requestType = service => testBooking(service) ? 'booking' : testSchedule(service) ? 'scheduling' : null

const filterCustomerServices = services => services
  .filter(service => Array.isArray(services) && services.length && (testBooking(service) || testSchedule(service)))

const [route, action] = ['schedule', 'refresh']

const getAllKeys = (store, size = 500) => new Promise(resolve => Object.assign(store.getAllKeys(), {
  onsuccess: event => {
    const tmp = event.target.result?.sort()
    const keys = []

    while (tmp.length) {
      const section = tmp.splice(0, size)
      keys.push([section[0], section.slice(-1)[0]])
    }
    resolve(keys)
  }
}))

const getServices = (serviceStore, customers) => new Promise(resolve => {
  const keys = Array.from(new Set(customers.flatMap(customer => customer.services.map(service => service.id)))).sort()

  if (!keys.length) return resolve([])

  const bounds = IDBKeyRange.bound(keys[0], ...keys.slice(-1))
  serviceStore.getAll(bounds)
    .onsuccess = event => {
      resolve(event.target.result
        .filter(service => keys.includes(service._id))
        .map(service => ({
          serviceId: service._id,
          serviceName: service.serviceName,
          serviceType: service.serviceType
        })))
    }
})

export const iterateCustomers = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  await clearStore('schedule')

  const transaction = db.transaction(['customers', 'services', 'schedule'], 'readwrite')
  const [customerStore, serviceStore, scheduleStore] = [
    transaction.objectStore('customers'),
    transaction.objectStore('services'),
    transaction.objectStore('schedule')
  ]

  const getServiceList = getServices.bind(null, serviceStore)

  const customerKeys = await getAllKeys(customerStore)

  return new Promise((resolve) => {
    while (customerKeys.length) {
      const bounds = IDBKeyRange.bound(...customerKeys.shift())
      customerStore.getAll(bounds)
        .onsuccess = async (event) => {
          const customers = event.target.result
            .filter(customer => filterCustomerServices(customer.services).length)

          const serviceList = await getServiceList(customers)

          const records = customers
            .flatMap(customer => self.createScheduleRecordsForCustomer(customer, serviceList))

          await Promise.all(records.map(record => putRecord(scheduleStore, record)))

          resolve({ status: 200, route, action })
        }
    }
  })
}
