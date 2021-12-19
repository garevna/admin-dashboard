// import { get } from '../helpers/AJAX/get'

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

  async getLastUpdates () {
    const [customers, tickets] = await Promise.all([
      getCustomerUpdates(),
      getTicketUpdates()
    ])

    self.postMessage({ status: 200, route: 'updates', action: '*', result: { customers, tickets } })
  }

  setLastRequestDate () {
    self.lastRequestTime = Date.now()
  }
}

export const updatesController = new UpdatesController()
