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
import documents from './documents'
import settings from './settings'

import {
  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  postBuildingDetails,
  putBuildingDetails,
  patchBuildingDetails,
  refreshBuildings,
  deleteBuilding
} from './map.worker'

const result = Object.assign({}, rsp, services, customers, tickets, schedule, documents, settings, {
  // init,
  auth,
  changePassword,
  resetPassword,
  sendPasswordResetCode,
  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  postBuildingDetails,
  putBuildingDetails,
  patchBuildingDetails,
  refreshBuildings,
  deleteBuilding
})

export default result
