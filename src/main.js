import Vue from './vue-extended'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'
import CustomerInfo from '@/components/popups/CustomerInfo.vue'
import Confirmation from '@/components/popups/Confirmation.vue'

import { init } from '@/controllers/actions/init'

import { createController } from './controllers/createController'

import PortalGoogleAutocomplete from 'portal-google-autocomplete'

import { toKebab, fromKebab } from './helpers'

customElements.define('portal-google-autocomplete', PortalGoogleAutocomplete)

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)
Vue.component('customer-info', CustomerInfo)
Vue.component('confirmation-popup', Confirmation)

window[Symbol.for('vue.instance')] = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Object.assign(window[Symbol.for('vue.prototype')], {
  __openExternalLink: function (url) {
    window.open(url, '_blank')
  },
  __removeGoogleMaps: function () {
    Array.from(document.getElementsByTagName('script')).filter(script => script.src.indexOf('https://maps.googleapis.com') === 0).forEach(script => script.remove())
    window.google = null
  }
})

createController()

init()

window.addEventListener('server-error', function (event) {
  window[Symbol.for('vue.instance')].$emit('open-error-popup', event.detail)
})

/* eslint-disable no-extend-native */

Object.assign(String.prototype, { toKebab, fromKebab })

// String.prototype.toKebab = function () {
//   return this.split(' ').join('-').split('')
//     .map((char, index) => char.charCodeAt(0) < 91 && char.charCodeAt(0) > 64 ? `${index ? '-' : ''}${char.toLowerCase()}` : char)
//     .join('').split('--').join('-')
// }

// String.prototype.fromKebab = function () {
//   const string = this.split('-').join(' ')
//   return `${string[0].toUpperCase()}${string.slice(1)}`
// }
