// import { get } from '../AJAX'
// import { /* clearStore, */ putRecordByKey } from '../db'
// import { refreshCustomersListError } from '../error-handlers'

// import { getResellersList } from '../rsp'

// import { getAllCustomers } from './'

export const refreshWithPagination = async function ({ pageNumber }) {
  // const [route, action] = ['customers', 'pagination']
  //
  // const skip = pageNumber * 5
  //
  // const response = await getResellersList()
  //
  // // self.postMessage({ status: 300, message: 'PAGINATION', page: pageNumber, result: response })
  //
  // if (response.status !== 200) return refreshCustomersListError(response.status)
  //
  // // clearStore('customers')
  //
  // for (const rsp of response.result) {
  //   if (rsp.userInfo.role !== 'RSP') continue
  //   const { status, result } = await get(`customer?skip=${skip}&limit=5`)
  //   // self.postMessage({ status: 300, rsp: rsp._id, customers: { status, result } })
  //   if (status !== 200 || !result) {
  //     self.postMessage(refreshCustomersListError(status))
  //     continue
  //   }
  //   for (const customer of result) {
  //     const { _id } = customer
  //     const { status } = await putRecordByKey('customers', _id, customer)
  //     if (status !== 200) refreshCustomersListError(status)
  //   }
  // }
  //
  // const { result } = await getAllCustomers()
  //
  // return { status: 200, route, action, result }
}
