// import { patchBuildingDetails } from './patchBuildingDetails'
// import { deleteBuilding } from './deleteBuilding'
// import { postBuilding } from './postBuilding'
//
// import { createBuildingExcelFile } from './createBuildingExcelFile'
//
// export {
//   postBuilding,
//   patchBuildingDetails,
//   deleteBuilding,
//   createBuildingExcelFile
// }

const context = require.context('./', false)

let moduleNames = context.keys().filter(key => key !== './' && key !== './index' && key !== './index.js')

moduleNames = Array.from(new Set(moduleNames))

const modules = Object.assign({}, ...moduleNames.map(name => ({ [name.split('./').join('').split('.js').join('')]: context(name) })))

const result = Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))

export default result
