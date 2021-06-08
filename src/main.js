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

createController()

init()
