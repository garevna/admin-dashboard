import Vue from 'vue'

// import { createController } from './controllers/createController'

import {
  createMapWorker,
  createAdminWorker
} from './controllers'

import configPlugin from '../config'
Vue.use(configPlugin)

window[Symbol.for('vue.prototype')] = Vue.prototype

createMapWorker()
createAdminWorker()

export default Vue
