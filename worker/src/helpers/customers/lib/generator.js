import { extractCustomerDataForList } from './extractCustomerDataForList'

const error = {
  status: 300,
  key: 'filtered-customers-error',
  title: 'Customer not found',
  message: 'Failed to get customer details'
}

export const generator = async function * (store, keys) {
  for (const id of keys) {
    yield new Promise(resolve => {
      Object.assign(store.get(id), {
        onsuccess: event => resolve(extractCustomerDataForList(event.target.result)),
        onerror: event => self.postMessage(error)
      })
    })
  }
}
