// import { getFromRemoteServer } from './getFromRemoteServer'
// import { getCategories } from './getCategories'
// import { putCategories } from './putCategories'
// import { getFromLocalDb } from './getFromLocalDb'
// import { getTicketData } from './getTicketData'
// import { postNewTicket } from './postNewTicket'
// import { putTicketData } from './putTicketData'
//
// export {
//   getFromRemoteServer,
//   getCategories,
//   putCategories,
//   getFromLocalDb,
//   getTicketData,
//   postNewTicket,
//   putTicketData
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
