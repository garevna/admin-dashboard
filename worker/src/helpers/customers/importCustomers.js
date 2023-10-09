import {
  importedCustomerCreation,
  callback,
  fileTypeError,
  fileReadError,
  fileParseError
} from './lib'

export const importCustomers = (file, resellerId) => new Promise((resolve, reject) => {
  if (file.type !== 'text/plain') return reject(fileTypeError)

  const reader = Object.assign(new FileReader(), {
    onload: event => {
      let customers = null
      try {
        const result = JSON.parse(event.target.result)
        customers = result[Object.keys(result)[0]].map(customer => importedCustomerCreation(customer))
        const addressList = Array.from(new Set(customers.map(customer => customer.address)))
        self.getBuildingsByAddressList(addressList, callback.bind(null, resolve, customers))
        if (resellerId) customers.forEach(customer => Object.assign(customer, { resellerId }))
      } catch (err) {
        console.warn('Error in source file: parsing as JSON failed\n', err)
        reject(fileParseError)
      }
    },
    onerror: () => reject(fileReadError)
  })
  reader.readAsText(file)
})
