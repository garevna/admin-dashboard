import {
  loginHandler,
  passwordHandler
} from '@/controllers/data-handlers'

import { normalizeAddress } from './normalizeAddress'
import { testTextField } from './testTextField'
import { validateAddress } from './validateAddress'
import { validateABN } from './validateABN'
import { readFile } from './readFile'
import { getBuildingUniqueCode } from './getBuildingUniqueCode'

export {
  loginHandler,
  passwordHandler,
  normalizeAddress,
  testTextField,
  validateAddress,
  validateABN,
  readFile,
  getBuildingUniqueCode
}
