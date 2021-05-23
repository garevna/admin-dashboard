import { openDB } from '../'

export const searchBookingByWeekNumber = (week) => new Promise((resolve) => {
  openDB().then(response => {
    const { status, result: db } = response
    if (status !== 200) return { status, result: db }
    const store = db.transaction('booking', 'readonly').objectStore('booking')
    const weekIndex = store.index('weekNumber')
    weekIndex.getAll(week).onsuccess = event => resolve(event.target.result)
  })
})
