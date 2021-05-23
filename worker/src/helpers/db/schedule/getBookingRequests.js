import { openDB } from '../openDB'

export const getScheduleByWeek = (weekNumber) => new Promise((resolve) => {
  openDB().then((response) => {
    const [route, action] = ['schedule', 'get']
    const { status, result: db } = response
    if (status !== 200) return { status, result: null }

    const transaction = db.transaction('schedule', 'readonly')
    transaction.oncomplete = event => {
      // self.postMessage({ status: 300, route: 'transaction', action: 'complete', result: event.target.result })
      // resolve({ status: 200, route, action, result: event.target.result })
    }
    transaction.onerror = event => resolve({
      status: 404,
      route,
      action,
      error: true,
      errorType: `Schedule: week ${weekNumber}`,
      errorMessage: 'Operation failed. Data not available.'
    })
    const store = transaction.objectStore('schedule')

    const weekIndex = store.index('weekNumber')
    // weekIndex.getAll(weekNumber).onsuccess = event => resolve(event.target.result)
    weekIndex.getAll(weekNumber).onsuccess = event => resolve({ status: 200, route, action, result: event.target.result })
  })
})
