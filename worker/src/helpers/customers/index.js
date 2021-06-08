// import { deleteCustomer } from './deleteCustomer'
// import { createCustomer } from './createCustomer'
// import { updateCustomer } from './updateCustomer'
// import { updateCustomerServiceStatus } from './updateCustomerServiceStatus'
// import { getCustomer } from './getCustomer'
// import { putCustomer } from './putCustomer'
// import { getAllCustomers } from './getAllCustomers'
// import { getFromRemoteServer } from './getFromRemoteServer'
// import { refreshWithPagination } from './refreshWithPagination'
//
// export {
//   getFromRemoteServer,
//   refreshWithPagination,
//   getAllCustomers,
//   getCustomer,
//   createCustomer,
//   putCustomer,
//   updateCustomer,
//   updateCustomerServiceStatus,
//   deleteCustomer
// }

const modules = {}

const context = require.context('./', false)

let modulesNames = context.keys()
  .filter(key => key !== './' && key !== './index' && key !== './index.js')
  .map(key => key.split('.js').join(''))

modulesNames = Array.from(new Set(modulesNames))

modulesNames.forEach((moduleName) => {
  const name = moduleName.split('./').join('')
  modules[name] = context(moduleName)
})

const result = Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))

export default result
