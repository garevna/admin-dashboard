import { updateCustomerServiceStatus } from '../customers'
import { put } from '../AJAX'

export const correctStatus = async (record) => {
  const { customerId, serviceId, status: serviceStatus, lots } = record

  // self.postMessage({ status: 300, message: 'SCHRDULE RECORD', id: record._id })

  if ((serviceStatus === 'Awaiting confirmation' || serviceStatus === 'Awaiting for confirmation') && !lots.length) {
    record.status = 'Awaiting for scheduling'
    if ((await updateCustomerServiceStatus({ customerId, serviceId, status: 'Awaiting for scheduling' })).status !== 200) {
      self.postMessage({ status: 300, title: 'ERROR UPDATING CUSTOMER SERVICE STATUS', record })
    }
    if ((await put(`scheduling/${record._id}`, record)).status !== 200) {
      self.postMessage({ status: 300, title: 'ERROR UPDATING SCHEDULE RECORD STATUS', record })
    }
  }

  return record
}
