import { routes } from './routes'
import { emptyData, secretError, encryptError, decryptError } from './errors'
import { serviceSchema } from './serviceSchema'

import { polygonColors } from './polygonColors'
import { polygonsEndpoint } from './polygonsEndpoint'

import { uploads } from './uploads'
import {
  invalidRoute,
  invalidFileType,
  uploadFailed
} from './uploadErrors'

import pdf404 from './pdf404'

export {
  routes,
  emptyData,
  secretError,
  encryptError,
  decryptError,
  serviceSchema,
  uploads,
  invalidRoute,
  invalidFileType,
  uploadFailed,

  pdf404,
  polygonColors,
  polygonsEndpoint
}
