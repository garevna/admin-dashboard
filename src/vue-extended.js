import Vue from 'vue'

import {
  createAdminWorker
} from './controllers'

import {
  getWeekNumber,
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

import configPlugin from '../config'

Vue.use(configPlugin)

Object.assign(Vue.prototype, {
  getWeekNumber,
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
})

window[Symbol.for('vue.prototype')] = Vue.prototype

window[Symbol.for('api.host')] = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://portal.dgtek.net'
    case 'staging':
    case 'development':
      return 'https://portal.staging.dgtek.net'
    case 'master':
      return `https://portal.${process.env.NODE_ENV}.dgtek.net`
    default:
      return 'https://portal.staging.dgtek.net'
  }
})()

window[Symbol.for('global.addressData')] = {
  address: '',
  coordinates: null,
  buildingId: null,
  status: null,
  addressComponents: {},
  url: null
}

window.addEventListener('dgtek-portal-map-package-error', function (event) {
  console.log(event.detail)
})

createAdminWorker()

export default Vue
