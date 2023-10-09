import { init, hash, encrypt, decrypt } from './crypto'

import rsp from './rsp'
import customers from './customers'
import services from './services'
import tickets from './tickets'
import schedule from './schedule'
import documents from './documents'
import settings from './settings'

import building from './building'
import polygons from './polygons'

import messages from './messages'

import * as updates from './updates'

import reports from './reports'

import { testDBVersion } from './db'

import { __clone } from './__clone'

const {
  auth,
  changePassword,
  passwordChange,
  passwordReset,
  sendPasswordResetCode,
  getAdmins,
  createAdmin,
  getUserDetails,
  updateAdmin
} = require('./admin').default

const result = Object.assign({}, building, rsp, customers, services, tickets, schedule, documents, settings, polygons, messages, updates, reports, {
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
  getAdmins,
  createAdmin,
  getUserDetails,
  updateAdmin,
  __clone,
  __roundFloat: number => Math.round((number + Number.EPSILON) * 100) / 100
})

Object.keys(result).forEach((key) => { self[key] = result[key] })

export default result
