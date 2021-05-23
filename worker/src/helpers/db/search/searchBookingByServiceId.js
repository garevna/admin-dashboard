import { openDB } from '../'

export const searchBookingByServiceId = (serviceId) => new Promise((resolve) => {
  openDB().then(response => {
    const { status, result: db } = response
    if (status !== 200) return { status, result: null }
    const store = db.transaction('booking', 'readonly').objectStore('booking')
    const serviceIndex = store.index('serviceId')
    serviceIndex.getAll(serviceId).onsuccess = event => resolve(event.target.result)
  })
})
