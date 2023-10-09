import { openDB } from '../openDB'

const [route, action] = ['services', 'search']

export const searchServiceByName = async (serviceName) => {
  const response = await openDB()
  if (response.status !== 200) return response

  const { result: db } = response

  const store = db.transaction(['services'], 'readwrite').objectStore('services')

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const service = cursor.value
        if (service.serviceName === serviceName) return resolve({ status: 200, route, action, result: service._id })
        else cursor.continue()
      } else {
        resolve({ status: 200, route, action })
      }
    }
  })
}
