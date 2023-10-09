import { openDB } from '../openDB'

const [route, action] = ['services', 'partial-search']

export const partialSearchService = async (searchString) => {
  const response = await openDB()
  if (response.status !== 200) return response

  const { result: db } = response

  const store = db.transaction(['services'], 'readwrite').objectStore('services')

  const result = []

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const { serviceName: name, _id: id, serviceType: type, partners } = cursor.value
        name.indexOf(searchString) !== -1 && result.push({ id, name, type, partners })
        cursor.continue()
      } else resolve({ status: 200, route, action, result })
    }
  })
}
