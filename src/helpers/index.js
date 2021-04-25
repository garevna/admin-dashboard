import {
  loginHandler,
  passwordHandler
} from '@/controllers/data-handlers'

import { normalizeAddress } from './normalizeAddress'
import { testTextField } from './testTextField'
import { createMapWorker } from './createMapWorker'
import { createAdminWorker } from './createAdminWorker'
import { validateAddress } from './validateAddress'
import { validateABN } from './validateABN'
import { readFile } from './readFile'
import { getBuildingUniqueCode } from './getBuildingUniqueCode'

export {
  loginHandler,
  passwordHandler,
  normalizeAddress,
  testTextField,
  createMapWorker,
  createAdminWorker,
  validateAddress,
  validateABN,
  readFile,
  getBuildingUniqueCode
}
