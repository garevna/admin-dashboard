// import { init } from './init'

import {
  auth,
  changePassword,
  resetPassword,
  sendPasswordResetCode
} from './admin'

import rsp from './rsp'
import services from './services'
import customers from './customers'
import tickets from './tickets'
import schedule from './schedule'

import {
  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  postBuildingDetails,
  putBuildingDetails
} from './map.worker'

const result = Object.assign({}, rsp, services, customers, tickets, schedule, {
  // init,
  auth,
  changePassword,
  resetPassword,
  sendPasswordResetCode,
  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  postBuildingDetails,
  putBuildingDetails
})

export default result

// export {
//   init,
//
//   rsp,
//   customers,
//   services,
//   tickets,
//   schedule,
//
//   auth,
//   changePassword,
//   resetPassword,
//   sendPasswordResetCode,
//
//   getBuildingByAddress,
//   getBuildingById,
//   getBuildingsByStatus,
//   postBuildingDetails,
//   putBuildingDetails
// }
