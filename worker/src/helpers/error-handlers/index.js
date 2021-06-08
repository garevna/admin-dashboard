import { credentialsError } from './admin/credentialsError'

import ticketsErrors from './tickets'

import servicesErrors from './services'

import rspErrors from './rsp'

import customersErrors from './customers'

import scheduleErrors from './schedule'

const result = Object.assign({}, ticketsErrors, servicesErrors, rspErrors, customersErrors, scheduleErrors, {
  credentialsError
})

export default result
