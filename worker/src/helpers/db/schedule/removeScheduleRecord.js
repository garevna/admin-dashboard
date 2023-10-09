import { openDB } from '../openDB'

export async function removeScheduleRecord (customerId, serviceId) {
  const [route, action] = ['schedule', 'delete']

  if (!(customerId && serviceId)) return self.errorMessage('invalidRequest')

  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: null }

  const store = db.transaction('schedule', 'readwrite').objectStore('schedule')
  const index = store.index('customerId')
  Object.assign(index.getAll(customerId), {
    onsuccess: (event) => {
      const foundByCustomerId = event.target.result

      for (const record of foundByCustomerId) {
        if (record.serviceId === serviceId) return { status: 200, route, action }
      }
    },
    onerror: () => self.errorMessage('deleteScheduleRecordError')
  })
}
