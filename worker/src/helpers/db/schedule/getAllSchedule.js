import { openDB } from '../openDB'

// import { getResellerDetails } from '../../rsp'
// import { getCustomer } from '../../customers'
// import { getServiceDetails } from '../../services'

import { getScheduleError } from '../../error-handlers'

function getAllData (db) {
  return new Promise(resolve => {
    const store = db.transaction('schedule', 'readonly').objectStore('schedule')
    // const weekIndex = store.index('weekNumber')
    Object.assign(store.getAll(), {
      onsuccess: event => resolve({ status: 200, result: event.target.result }),
      onerror: event => resolve({ status: event.target.errorCode, result: event.target.error })
    })
  })
}

export const getAllSchedule = async () => {
  const [route, action] = ['schedule', 'all']

  const { result: db } = await openDB()

  const { status, result } = await getAllData(db)

  // self.postMessage({ status: 300, route, action, result: { status, result } })

  if (status !== 200) return getScheduleError(status)

  const schedule = result.filter(record => record.status === 'In job queue' || record.status === 'Awaiting for confirmation' || record.status === 'Awaiting confirmation')

  // self.postMessage({ status: 300, schedule })

  // for (const index in schedule) {
  //   const { resellerId, customerId, serviceId } = result[index]
  //   const response = await Promise.all([
  //     getResellerDetails(resellerId),
  //     getCustomer(customerId),
  //     getServiceDetails(serviceId)
  //   ])
  //   self.postMessage({ status: 300, route, action, result: response })
  // }
  return { status: 200, route, action, result: schedule }
}
