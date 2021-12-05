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
import { getGeneralBuildingData } from './getGeneralBuildingData'
import { convertBuildingStatus } from './convertBuildingStatus'
import { getRouteByBuildingStatus } from './getRouteByBuildingStatus'

import { setCategories } from './setCategories'

export {
  loginHandler,
  passwordHandler,

  normalizeAddress,
  testTextField,
  validateAddress,
  validateABN,

  readFile,

  getBuildingUniqueCode,
  getGeneralBuildingData,
  convertBuildingStatus,
  getRouteByBuildingStatus,

  setCategories
}
