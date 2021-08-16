import { init, hash, encrypt, decrypt } from './crypto'

import rsp from './rsp'
import customers from './customers'
import services from './services'
import tickets from './tickets'
import schedule from './schedule'
import documents from './documents'

import { patchBuildingDetails } from './building'

import { testDBVersion } from './db'

const {
  auth,
  changePassword,
  passwordChange,
  passwordReset,
  sendPasswordResetCode
} = require('./admin').default

const result = Object.assign({}, rsp, customers, services, tickets, schedule, documents, {
  testDBVersion,
  init,
  hash,
  encrypt,
  decrypt,
  auth,
  passwordReset,
  sendPasswordResetCode,
  changePassword,
  passwordChange,

  patchBuildingDetails
})

Object.keys(result).forEach((key) => { self[key] = result[key] })

export default result
