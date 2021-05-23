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
  refreshResellersList,
  getResellersList,
  getResellerDetails
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
  putCategories,
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

import {
  getScheduleWeekData,
  getBookingRequests,
  changeServiceDeliveryStatus
} from './schedule'

export {
  init,

  loginHandler,
  passwordHandler,
  codeHandler,

  auth,
  changePassword,
  resetPassword,
  sendPasswordResetCode,

  refreshResellersList,
  refreshCustomers,
  refreshTickets,

  getResellersList,
  getResellerDetails,

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
  putCategories,
  getTicketById,
  postNewTicket,
  saveTicketData,

  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  postBuildingDetails,
  putBuildingDetails,

  getScheduleWeekData,
  getBookingRequests,
  changeServiceDeliveryStatus
}
