import { openDB } from '../openDB'

// import { getResellerDetails } from '../../rsp'
// import { getCustomer } from '../../customers'
// import { getServiceDetails } from '../../services'

function getAllData (db, weekNumber) {
  return new Promise(resolve => {
    const store = db.transaction('schedule', 'readonly').objectStore('schedule')
    const weekIndex = store.index('weekNumber')
    Object.assign(weekIndex.getAll(weekNumber), {
      onsuccess: event => resolve({ status: 200, result: event.target.result }),
      onerror: event => resolve({ status: event.target.errorCode, result: event.target.error })
    })
  })
}

export const getScheduleByWeek = async (weekNumber) => {
  const [route, action] = ['schedule', 'get']

  const { result: db } = await openDB()

  const { status, result } = await getAllData(db, weekNumber)

  // self.postMessage({ status: 300, route, action, result: { status, result } })

  if (status !== 200) {
    return {
      status,
      route,
      action,
      error: true,
      errorType: `Schedule: week ${weekNumber}`,
      errorMessage: 'Error fetching the data from local DB'
    }
  }

  // self.postMessage({ status: 300, route, action, result })

  // for (const index in result) {
  //   const { resellerId, customerId, serviceId } = result[index]
  //   const response = await Promise.all([
  //     getResellerDetails(resellerId),
  //     getCustomer(customerId),
  //     getServiceDetails(serviceId)
  //   ])
  //   self.postMessage({ status: 300, route, action, result: response })
  // }
  return { status: 200, route, action, result }
}
