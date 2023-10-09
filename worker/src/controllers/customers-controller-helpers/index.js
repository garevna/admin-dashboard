import { createCustomer } from './create'

import { saveCustomers } from './save'

import {
  getAllCustomers,
  getCustomer,
  getCustomersEngineeringData,
  getShortListOfCustomers,
  getFilteredShortListOfCustomers,
  getCustomersByResellerId,
  getCustomersByPageNumber,
  getCustomersForExcel,
  getCustomerServices
} from './read'

import {
  updateCustomer,
  patchCustomer,
  patchCustomersGroupService,
  updateServiceCancelationDate,
  updateServiceSuspensionDate,
  updateServiceResumingDate
} from './update'

import { deleteCustomer, deleteGroupOfCustomers } from './remove'

import {
  refresh,
  hardRefresh,
  refreshUpdatedCustomersOnly
} from './refresh'

import { searchByUniqueCode } from './search-by-unique-code'
import { search } from './search'

import { importCustomerUpdates } from './import'

export {
  createCustomer,
  saveCustomers,

  getAllCustomers,
  getCustomer,
  getCustomersEngineeringData,
  getShortListOfCustomers,
  getFilteredShortListOfCustomers,
  getCustomersByResellerId,
  getCustomersByPageNumber,
  getCustomersForExcel,
  getCustomerServices,

  searchByUniqueCode,
  search,
  importCustomerUpdates,

  updateCustomer,
  patchCustomer,
  patchCustomersGroupService,
  updateServiceCancelationDate,
  updateServiceSuspensionDate,
  updateServiceResumingDate,

  deleteCustomer,
  deleteGroupOfCustomers,

  refresh,
  hardRefresh,
  refreshUpdatedCustomersOnly
}
