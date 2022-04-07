import { openDB } from '../openDB'

import { pendingConnectionStatusHandler } from '../../../data-handlers'

import { getDate, currentMonth, lastMonth } from './'

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

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = cursor.value
        const { buildingId, services, commercial } = customer

        self.postDebugMessage({ commercial })

        const activeServices = services.filter(item => item.status === 'Active')
        const pendingServices = services.filter(item => pendingConnectionStatusHandler().admin.includes(item.status))

        if (Array.isArray(services) && services.length > 0) {
          Object.assign(reportStore.get(buildingId), {
            onsuccess: event => {
              const record = event.target.result

              if (!record) return

              Object.assign(record, {
                customers: {
                  residential: record.customers.residential + (customer.commercial ? 0 : 1),
                  commercial: record.customers.commercial + (customer.commercial ? 1 : 0)
                },
                connections: {
                  active: record.connections.active + (activeServices.length ? 1 : 0),
                  pending: record.connections.pending + (pendingServices.length ? 1 : 0),
                  pendingLastMonth: record.connections.pendingLastMonth + (pendingServices.filter(item => currentMonth(item)).length > 0)
                },
                services: {
                  active: record.services.active + activeServices.length,
                  pending: record.services.pending + pendingServices.length,
                  pendingLastMonth: record.connections.pendingLastMonth + (pendingServices.filter(item => currentMonth(item)).length)
                },
                newActiveConnections: {
                  lastMoth: record.newActiveConnections.lastMoth + activeServices.filter(item => lastMonth(item)).length > 0,
                  currentMoth: record.newActiveConnections.currentMoth + activeServices.filter(item => currentMonth(item)).length > 0
                },
                newActiveServices: {
                  lastMoth: record.newActiveServices.lastMoth + activeServices.filter(item => lastMonth(item)).length,
                  currentMoth: record.newActiveServices.currentMoth + activeServices.filter(item => currentMonth(item)).length
                }
              })

              !record.active && Object.assign(record, { active: {} })
              !record.pending && Object.assign(record, { pending: {} })

              const active = activeServices
                .map(service => ({ serviceId: service.id, activationDate: getDate(service) }))

              for (const service of active) {
                const activationDate = getDate(service)

                Object.assign(serviceStore.get(service.serviceId), {
                  onsuccess: ev => {
                    const { subscriptionFee } = ev.target.result
                    const sum = record.active[activationDate] ? record.active[activationDate] + subscriptionFee : subscriptionFee

                    Object.assign(record.active, { [activationDate]: sum })

                    Object.assign(reportStore.put(record), {
                      onsuccess: evnt => self.postDebugMessage({ record })
                    })
                  },
                  onerror: ev => self.postDebugMessage({ serviceError: ev.target.error })
                })
              }
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
