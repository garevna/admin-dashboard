import Vue from './vue-extended'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import { init } from '@/controllers/actions/init'

import { createController } from './controllers/createController'

import { toKebab, fromKebab } from './helpers'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'
import Errors from '@/components/popups/Errors.vue'
import DebugConsole from '@/components/popups/DebugConsole.vue'
import CustomerInfo from '@/components/popups/CustomerInfo.vue'
import Confirmation from '@/components/popups/Confirmation.vue'

import PortalGoogleAutocomplete from 'portal-google-autocomplete'

customElements.define('portal-google-autocomplete', PortalGoogleAutocomplete)

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('errors-panel', Errors)
Vue.component('debug-console', DebugConsole)
Vue.component('simple-message', Message)
Vue.component('customer-info', CustomerInfo)
Vue.component('confirmation-popup', Confirmation)

window[Symbol.for('vue.instance')] = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

createController()

init()

window.addEventListener('server-error', function (event) {
  window[Symbol.for('vue.instance')].$emit('open-error-popup', event.detail)
})

/* eslint-disable no-extend-native */

Object.assign(String.prototype, { toKebab, fromKebab })
