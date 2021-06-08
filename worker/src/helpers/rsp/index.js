// import { getRegistrationRequests } from './getRegistrationRequests'
// import { getRegistrationRequestDetails } from './getRegistrationRequestDetails'
// import { confirmRegistrationRequest } from './confirmRegistrationRequest'
// import { rejectRegistrationRequest } from './rejectRegistrationRequest'
//
// import { getFromRemoteServer } from './getFromRemoteServer'
// import { getResellersList } from './getResellersList'
// import { getResellerDetails } from './getResellerDetails'
//
// export {
//   getRegistrationRequests,
//   getRegistrationRequestDetails,
//   confirmRegistrationRequest,
//   rejectRegistrationRequest,
//
//   getFromRemoteServer,
//   getResellersList,
//   getResellerDetails
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
