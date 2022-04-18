import { openDB } from '../openDB'

import { updateRecord } from './'

const [route, action] = ['reports', 'calculate']

export const calculate = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services', 'reports'], 'readwrite')
  const [customerStore, serviceStore, reportStore] = [
    transaction.objectStore('customers'),
    transaction.objectStore('services'),
    transaction.objectStore('reports')
  ]

  const getServiceFee = serviceId => new Promise((resolve, reject) => {
    Object.assign(serviceStore.get(serviceId), {
      onsuccess: ev => resolve({ subscriptionFee: ev.target.result.subscriptionFee, serviceType: ev.target.result.serviceType }),
      onerror: ev => {
        self.postDebugMessage({ serviceError: ev.target.error })
        reject(ev.target.error)
      }
    })
  })

  const putRecord = async record => new Promise((resolve, reject) => {
    Object.assign(reportStore.put(record), {
      onsuccess: evnt => {
        // self.postDebugMessage({ SAVED_RECORD: record })
        resolve(evnt.target.result)
      },
      onerror: evnt => {
        // self.postDebugMessage({ ERROR: evnt.target.error })
        reject(evnt.target.error)
      }
    })
  })

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result

      if (cursor) {
        const customer = cursor.value

        const { buildingId, services, commercial } = customer

        const connection = services && services.filter(service => service.status === 'Active').length > 0 ? 1 : 0

        const type = commercial ? 'commercial' : 'residential'

        if (Array.isArray(services) && services.length > 0) {
          Object.assign(reportStore.get(buildingId), {
            onsuccess: async event => {
              const record = event.target.result

              if (!record) return self.postDebugMessage({ ERROR: `Building ${buildingId} not found`, customer })

              record.connections.active += connection

              record.connections[type] += connection

              // record.customers[type] += 1

              const { activeServices, pendingServices } = updateRecord(record, customer)

              self.postDebugMessage(record)

              const { active, pending } = record

              for (const service of pendingServices) {
                const { subscriptionFee, serviceType } = await getServiceFee(service.serviceId)
                if (!pending[serviceType][service.date]) pending[serviceType][service.date] = 0
                pending[serviceType][service.date] += subscriptionFee
              }

              for (const service of activeServices) {
                const { subscriptionFee, serviceType } = await getServiceFee(service.serviceId)
                if (!active[serviceType][service.date]) active[serviceType][service.date] = 0
                active[serviceType][service.date] += subscriptionFee
              }

              Object.assign(record, { active, pending })

              await putRecord(record)
            },
            onerror: event => self.postDebugMessage({ reportRecordAbsent: event.target.error })
          })
        }

        cursor.continue()
      } else {
        resolve({ status: 200, route, action })
      }
    }
  })
}
