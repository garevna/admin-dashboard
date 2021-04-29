import { init } from './init'

import {
  loginHandler,
  passwordHandler,
  codeHandler
} from '../data-handlers'

import {
  auth,
  changePassword,
  resetPassword,
  sendPasswordResetCode
} from './admin'

import {
  getClientData,
  putClientData,
  refreshClientData
} from './rsp'

import {
  refreshServices,
  getListOfServices,
  getServiceDetails,
  createNewService,
  updateServiceDetails
} from './services'

import {
  deleteCustomer,
  getCustomerData,
  getCustomers,
  postCustomer,
  putCustomer,
  refreshCustomers
} from './customers'

import {
  getCategories,
  getTicketById,
  getTickets,
  postNewTicket,
  refreshTickets,
  saveTicketData
} from './tickets'

import {
  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  postBuildingDetails,
  putBuildingDetails
} from './map.worker'

export {
  init,

  loginHandler,
  passwordHandler,
  codeHandler,

  auth,
  changePassword,
  resetPassword,
  sendPasswordResetCode,

  refreshClientData,
  refreshCustomers,
  refreshTickets,
  getClientData,
  putClientData,

  getCustomers,
  getCustomerData,
  putCustomer,
  postCustomer,
  deleteCustomer,

  refreshServices,
  getListOfServices,
  getServiceDetails,
  createNewService,
  updateServiceDetails,

  getTickets,
  getCategories,
  getTicketById,
  postNewTicket,
  saveTicketData,

  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  postBuildingDetails,
  putBuildingDetails
}
