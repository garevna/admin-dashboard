import { openDB } from '../db/openDB'

const [route, action] = ['customers', 'search-by-unique-code']

const error = {
  status: 300,
  key: 'import-customer-updates',
  title: 'Customer import error'
}

export const getCustomersByUniqueCode = async function (list) {
  const [key, title] = ['invalid-source-data', 'Invalid source data']

  if (!Array.isArray(list)) return self.postMessage(Object.assign({}, error, { key, title, message: 'Unable to update customers' }))

  if (list.filter(item => !item).length > 0) return self.postMessage(Object.assign({}, error, { key, title, message: 'Unique code is required' }))

  const { status, result: db } = await openDB()

  if (status !== 200) return { status, route, action, result: db }

  const partners = (await self.getResellersList()).result.map(partner => ({ id: partner._id, name: partner.company.name }))

  for (const partner of partners) {
    const services = (await self.getPartnerServices(partner.id)).result
      .map(service => ({ id: service.id, name: service.name }))
    Object.assign(partner, { services })
  }

  const result = { customers: [], partners: [] }

  const transaction = db.transaction(['customers'], 'readonly')
  const customerStore = transaction.objectStore('customers')

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customerFromDB = cursor.value
        if (list.includes(customerFromDB.uniqueCode)) {
          const partner = partners.find(record => record.id === customerFromDB.resellerId)

          if (!partner) self.postMessage(Object.assign(error, { message: `Customer: ${customerFromDB.uniqueCode}` }))
          else {
            result.customers.push(Object.assign(self.clone(customerFromDB), { partnerName: partner.name }))
            result.partners.push(partner)
          }
        }
        cursor.continue()
      } else {
        if (list.length > result.customers.length) {
          const res = result.customers.map(customer => customer.uniqueCode)
          list
            .map((uniqueCode, index) => res.includes(uniqueCode) ? -1 : index)
            .filter(index => index !== -1)
            .map(index => list[index])
            .forEach(err => self.postMessage(Object.assign(error, { message: `Customer ${err} not found in DB` })))
        }
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
