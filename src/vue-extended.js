import Vue from 'vue'

import { getExtensionForVue } from './getExtensionForVue'
import { setGlobals } from './setGlobals'

import { createAdminWorker } from './controllers'

import configPlugin from '../config'

Vue.use(configPlugin)

Object.assign(Vue.prototype, getExtensionForVue())

window[Symbol.for('vue.prototype')] = Vue.prototype

window[Symbol.for('api.host')] = Vue.prototype.$apiHost()

setGlobals()

createAdminWorker()

export default Vue
