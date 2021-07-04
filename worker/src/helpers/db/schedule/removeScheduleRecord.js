// import { deleteScheduleRecord } from '../'
import { openDB } from '../openDB'

export async function removeScheduleRecord (customerId, serviceId) {
  const [route, action] = ['schedule', 'delete']

  self.postDebugMessage({ message: 'REMOVE SCHEDULE RECORD', customerId, serviceId })

  if (!(customerId && serviceId)) return self.errorMessage('invalidRequest')

  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: null }

  const store = db.transaction('schedule', 'readwrite').objectStore('schedule')
  const index = store.index('customerId')
  Object.assign(index.getAll(customerId), {
    onsuccess: (event) => {
      const foundByCustomerId = event.target.result

      self.postDebugMessage({ message: 'REMOVE SCHEDULE RECORD', foundByCustomerId })

      for (const record of foundByCustomerId) {
        if (record.serviceId === serviceId) {
          self.postDebugMessage({ message: 'REMOVE SCHEDULE RECORD', record })
          return { status: 200, route, action }
        }
      }
    },
    onerror: () => self.errorMessage('deleteScheduleRecordError')
  })
}
