import { roleHandler } from '../helpers/env'
import { accessSettingsHandler } from '../data-handlers'

import { admin } from './routes/admin'
import { building } from './routes/building'
import { files } from './routes/files'
import { polygons } from './routes/polygons'
import { rsp } from './routes/rsp'
import { customers } from './routes/customers'
import { services } from './routes/services'
import { sla } from './routes/sla'
import { tickets } from './routes/tickets'
import { documents } from './routes/documents'
import { schedule } from './routes/schedule'
import { booking } from './routes/booking'
import { lots } from './routes/lots'
import { messages } from './routes/messages'
import { settings } from './routes/settings'
import { updates } from './routes/updates'

import { reports } from './routes/reports'

const { cryptoController } = require('../controllers').default

export const routes = {
  channel: {
    port: request => {
      self.channelPort = request.port
    }
  },
  '*': {
    refresh: async () => {
      const response = await self.refreshSettings()

      self.postMessage(Object.assign(response, { action: 'initial-refresh' }))

      const rights = accessSettingsHandler().access[roleHandler()]

      const actions = [
        rights.services ? self.refreshServicesList : null,
        rights.partners || rights.rsp ? self.getResellersFromRemoteServer : null,
        rights.tickets ? self.getTicketsFromRemoteServer : null,
        rights.documents ? self.refreshDocumentsList : null
      ].filter(item => !!item)

      for (const action of actions) {
        action().then(response => self.postMessage(Object.assign(response, { action: 'initial-refresh' })))
      }

      if (rights.customers) {
        self.downloadAllCustomers().then(response => {
          self.postMessage(Object.assign(response, { action: 'initial-refresh' }))
          self.refreshSchedule().then(response => self.postMessage(Object.assign(response, { action: 'initial-refresh' })))
        })
      }
    }
  },

  admin,
  building,
  files,
  polygons,
  rsp,
  customers,
  services,
  sla,
  tickets,
  documents,
  schedule,
  booking,
  lots,
  settings,
  updates,
  messages,
  reports,

  crypto: {
    init: cryptoController.init,
    encrypt: cryptoController.encrypt,
    decrypt: cryptoController.decrypt
  }
}
