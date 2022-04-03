import { init } from './init'

import admin from './admin'
import rsp from './rsp'
import services from './services'
import customers from './customers'
import tickets from './tickets'
import schedule from './schedule'
import documents from './documents'
import settings from './settings'

import reports from './reports'

import buildings from './map.worker'

import files from './files'

import messages from './messages'

const result = Object.assign({}, init, admin, rsp, services, customers, tickets, schedule, documents, settings, buildings, files, messages, reports)

export default result
