import {
  codeHandler,
  loginHandler,
  passwordHandler,
  credentialsHandler,
  partnerDetailsHandler,
  messageHandler,
  errorMessageHandler
} from '@/controllers/data-handlers'

import { createController } from './createController'
import { createMapWorker } from './createMapWorker'
import { createAdminWorker } from './createAdminWorker'

import { eventsTable } from './events-table'

export {
  codeHandler,
  loginHandler,
  passwordHandler,
  credentialsHandler,
  partnerDetailsHandler,
  createMapWorker,
  createAdminWorker,
  createController,
  messageHandler,
  errorMessageHandler,

  eventsTable
}
