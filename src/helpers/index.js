import {
  loginHandler,
  passwordHandler
} from '@/controllers/data-handlers'

import { parseDate } from './parseDate'

import { normalizeAddress } from './normalizeAddress'
import { testTextField } from './testTextField'
import { validateAddress } from './validateAddress'
import { validateABN } from './validateABN'

import { toKebab } from './toKebab'
import { fromKebab } from './fromKebab'

import { readFile } from './readFile'

import { getBuildingUniqueCode } from './getBuildingUniqueCode'
import { getGeneralBuildingData } from './getGeneralBuildingData'
import { convertBuildingStatus } from './convertBuildingStatus'
import { getRouteByBuildingStatus } from './getRouteByBuildingStatus'

import { setCategories } from './setCategories'

export {
  loginHandler,
  passwordHandler,

  parseDate,

  normalizeAddress,
  testTextField,
  validateAddress,
  validateABN,

  toKebab,
  fromKebab,

  readFile,

  getBuildingUniqueCode,
  getGeneralBuildingData,
  convertBuildingStatus,
  getRouteByBuildingStatus,

  setCategories
}
