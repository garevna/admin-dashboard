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

createMapWorker()
createAdminWorker()

export default Vue
