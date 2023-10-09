import {
  importedCustomerCreation,
  fileTypeError,
  fileReadError,
  fileParseError,
  searchError
} from './lib'

const [route, action] = ['customers', 'import-updates']

const error = {
  status: 300,
  key: 'import-customer-updates',
  title: 'Import customer updates',
  message: 'Failed to parse file data'
}

export const importCustomerUpdates = file => new Promise((resolve, reject) => {
  if (!file || file.type !== 'text/plain') {
    self.postMessage(Object.assign({}, error, { message: 'Invalid file type' }))
    return reject(fileTypeError)
  }

  const reader = Object.assign(new FileReader(), {
    onload: event => {
      let data = null

      try {
        data = JSON.parse(event.target.result)
      } catch (err) {
        self.postMessage(error)
        return reject(fileParseError)
      }

      const updates = data[Object.keys(data)[0]]
        .map(customer => importedCustomerCreation(customer))

      updates
        .forEach(customer => Object.keys(customer).forEach(key => { if (!customer[key]) delete customer[key] }))

      const list = updates.map(customer => customer.uniqueCode)

      self.getCustomersByUniqueCode(list)
        .then(response => {
          if (!response || !response.result) return reject(searchError)

          const result = response.result

          result.customers.forEach((customer, ind) => {
            const index = updates.findIndex(update => update.uniqueCode === customer.uniqueCode)

            if (index === -1) return

            const number = customer.services
              .findIndex(service => service.serviceName === updates[index].services[0].serviceName)

            if (number === -1) {
              const partner = result.partners.find(item => item.id === customer.resellerId)
              if (partner) {
                const service = partner.services.find(item => item.name === updates[index].services[0].serviceName)
                if (service) {
                  customer.services.push(Object.assign(updates[index].services[0], { id: service.id }))
                } else self.postMessage(Object.assign(error, { message: `Service ${updates[index].services[0].serviceName} not found for customer ${customer.uniqueCode}` }))
              }
            } else Object.assign(customer.services[number], updates[index].services[0])

            delete updates[index].services
            Object.assign(customer, updates[index])
          })

          resolve({ status: 200, route, action, result })
        })
    },
    onerror: () => reject(fileReadError)
  })
  reader.readAsText(file)
})
