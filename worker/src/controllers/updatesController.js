// import { get } from '../helpers/AJAX/get'
import {
  iterateCustomers
} from '../helpers/db'

import {
  getRegistrationUpdates,
  getCustomerUpdates,
  getTicketUpdates
} from '../helpers/updates'

// import { putRecordByKey } from '../helpers/db'

class UpdatesController {
  async getRegistrationUpdates () {
    self.postMessage(await getRegistrationUpdates())
  }

  async getCustomerUpdates () {
    self.postMessage(await getCustomerUpdates())
  }

  async getTicketUpdates () {
    self.postMessage(await getTicketUpdates())
  }

  async getScheduleUpdates () {
    self.postMessage(await iterateCustomers())
  }

  async getLastUpdates () {
    const [customers, tickets] = await Promise.all([
      getCustomerUpdates(),
      getTicketUpdates()
    ])

    if (!customers.result?.length && !tickets.result?.length) return

    if (customers.result.length) await iterateCustomers()

    self.postMessage({ status: 200, route: 'updates', action: '*', result: { customers: customers.result, tickets: tickets.result } })
  }

  setLastRequestDate () {
    self.lastRequestTime = Date.now()
  }
}

export const updatesController = new UpdatesController()
