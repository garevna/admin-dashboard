import Vue from './vue-extended'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'

import { init } from '@/controllers/actions'
import { initCallback /*, refreshCallback */ } from '@/controllers/callbacks'

import { setBuildingHandlers } from '@/helpers/map.worker'

import { createController } from './controllers/createController'

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)

const instance = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

window[Symbol.for('vue.instance')] = instance

createController()

console.log('VUE PROTOTYPE:\n', Vue.prototype)
console.log('INSTANCE:\n', instance)

instance.__worker.addEventListener('message', initCallback)
init()

/* ===================== MAP WORKER ========================= */

setBuildingHandlers()
