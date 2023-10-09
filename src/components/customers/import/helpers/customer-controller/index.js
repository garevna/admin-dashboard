import { requiredFields, messages } from './customerRequiredFields'
import { connectionInfoWarnings } from './connectionInfoWarnings'

import { parseDate } from '@/helpers'

import * as customerMethods from './methods-for-customer'
import * as servicesMethods from './methods-for-services'
import * as discountMethods from './methods-for-service-discount'

export const result = Object.assign({}, customerMethods, servicesMethods, discountMethods, {
  parseDate,
  requiredFields,
  messages,
  connectionInfoWarnings
})
