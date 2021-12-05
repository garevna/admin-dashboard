import { openDB } from '../db/openDB'

import { uniqueCodeList } from '../data-handlers'

export const getAllCustomers = async function () {
  const [route, action] = ['customers', 'list']

  let response = await self.getServicesListFromLocalDb()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const servicesList = response.result

  response = await openDB()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const db = response.result

  const result = []

  const store = db.transaction(['customers'], 'readonly').objectStore('customers')

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        const { customerCreationDate, firstName, lastName, uniqueCode, address, apartmentNumber, services, _id, resellerId } = cursor.value
        const item = {
          id: _id,
          resellerId,
          customerCreationDate,
          name: `${firstName} ${lastName}`,
          uniqueCode: `${uniqueCodeList(resellerId)}${uniqueCode.slice(2)}`,
          address: `${apartmentNumber}/${address}`,
          services: []
        }
        if (Array.isArray(services)) {
          for (const service of services) {
            const index = servicesList.findIndex(serv => serv._id === service.id)
            if (index === -1) continue
            item.services.push({
              type: servicesList[index].serviceType,
              name: servicesList[index].serviceName,
              status: service.status,
              modified: service.modified
            })
          }
        }

        result.push(item)
        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
