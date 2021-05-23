import { openDB } from '../openDB'

export const getBooking = () => new Promise((resolve) => {
  openDB().then((response) => {
    const { status, result: db } = response
    if (status !== 200) return { status, result: null }

    const store = db.transaction('schedule', 'readonly').objectStore('schedule')
    const bookingIndex = store.index('request')
    bookingIndex.getAll('booking').onsuccess = event => resolve({
      status: 200,
      route: 'booking',
      action: 'get',
      result: event.target.result
    })
  })
})
