import { openDB } from '../'

export const searchBookingByResellerId = (resellerId) => new Promise((resolve) => {
  openDB().then(response => {
    const { status, result: db } = response
    if (status !== 200) return { status, result: null }
    const store = db.transaction('booking', 'readonly').objectStore('booking')
    const resellerIndex = store.index('resellerId')
    resellerIndex.getAll(resellerId).onsuccess = event => resolve(event.target.result)
  })
})
