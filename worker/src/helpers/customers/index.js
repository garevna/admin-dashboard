import { deleteCustomer } from './deleteCustomer'
import { createCustomer } from './createCustomer'
import { updateCustomer } from './updateCustomer'
import { updateCustomerServiceStatus } from './updateCustomerServiceStatus'
import { getCustomer } from './getCustomer'
import { putCustomer } from './putCustomer'
import { getAllCustomers } from './getAllCustomers'
import { getFromRemoteServer } from './getFromRemoteServer'
import { refreshWithPagination } from './refreshWithPagination'

export {
  getFromRemoteServer,
  refreshWithPagination,
  getAllCustomers,
  getCustomer,
  createCustomer,
  putCustomer,
  updateCustomer,
  updateCustomerServiceStatus,
  deleteCustomer
}
