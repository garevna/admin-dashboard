import Vue from 'vue'

import {
  createMapWorker,
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

window[Symbol.for('api.host')] = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_HOST_PROD : process.env.VUE_APP_API_HOST_DEV

window[Symbol.for('global.addressData')] = {
  address: '',
  coordinates: null,
  buildingId: null,
  status: null,
  addressComponents: {},
  url: null
}

createMapWorker()
createAdminWorker()

export default Vue
