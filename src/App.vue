<template>
  <v-app class="transparent" style="max-height: 100vh; overflow-y: auto;">
    <v-app-bar app flat height="80" class="homefone">
      <v-card flat class="transparent text-left mt-4 ml-0" height="50">
        <v-img :src="require('@/assets/dgtek-logo.svg')" width="70" class="mr-8" />
      </v-card>
      <h3 class="main-header mt-4">DGtek Admin provisioning portal</h3>
      <v-spacer />
      <v-btn icon v-if="$route.name !== 'home'" @click="$router.push({ name: 'home' })">
        <v-icon large color="primary">mdi-location-exit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="main-content mt-0" style="margin-bottom: 320px;">
      <v-progress-linear
        :active="progress"
        :indeterminate="progress"
        color="primary"
        fixed
        style="top: 80px; z-index: 5"
      ></v-progress-linear>

      <transition name="page-fade-transition" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-snackbar v-model="snackbar" :timeout="timeout" color="primary" top>
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#fff"
          class="close-icon-snackbar"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon large>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-row justify="center" class="bottom-info-bar">
      <p class="text-center bottom-info-bar--text">
        <small>
          <sub>2021 &copy; Dgtek Pty. Ltd ABN 61 600 896 115</sub>
        </small>
      </p>
    </v-row>

    <error-message />
    <simple-message />
    <customer-info />
    <confirmation-popup />
  </v-app>
</template>

<script>

import '@/sass/main.scss'
import 'dgtek-styles'

// import { credentialsHandler, roleHandler } from '@/controllers/data-handlers'

const servicesImage = require('@/assets/images/melbourne-2-1.svg')
const homeImage = require('@/assets/images/Webb-Bridge-Melbourne-Drawing-effect.svg')

export default {
  name: 'App',

  data: () => ({
    ready: false,
    progress: false,
    snackbar: false,
    message: 'Welcome to DGtek Admin provisioning portal',
    timeout: 8000
  }),

  computed: {
    color () {
      return this.authError || this.registeredError || this.error ? '#900' : '#09b'
    },
    text () {
      return this.error || this.registeredError ? 'Error' : 'Success'
    },
    backgroundImage () {
      return this.$route.name === 'home' ? homeImage : servicesImage
    }
  },

  methods: {
    errorHandler (event) {
      const { errorType, errorMessage } = event.data
      this.$root.$emit('open-error-popup', { errorType, errorMessage })
    },

    messageHandler (event) {
      const { messageType, messageText } = event.data
      this.$root.$emit('open-message-popup', { messageType, messageText })
    },

    setReady () {
      this.ready = true
    },

    dataRefreshing () {
      this.snackbar = true
      this.message = 'Refreshing the data'
    },

    dataRefreshed () {
      this.snackbar = false
      this.message = 'Refreshing the data complete'
    },

    progressEventCallback (progress) {
      this.progress = progress
    }
  },

  beforeDestroy () {
    this.$root.$off('page-of-customers-received', this.pageOfCustomersReceived)

    this.$root.$off('app-is-ready', this.setReady)
    this.$root.$off('db-refreshing', this.dataRefreshing)
    this.$root.$off('db-refreshing-complete', this.dataRefreshed)
    this.$root.$off('progress-event', this.progressEventCallback)
  },

  mounted () {
    // roleHandler(localStorage.getItem('admin'))
    // credentialsHandler(localStorage.getItem('refresh'))

    this.$root.$on('show-snackbar', this.showSnackbar)
    this.$root.$on('hide-snackbar', this.hideSnackbar)

    if (this.$apiHost() === 'https://dka.portal.staging.dgtek.net') this.$root.$emit('show-snackbar', 'Staging release. You are at testing mode now.')

    this.$root.$on('app-is-ready', this.setReady)
    this.$root.$on('db-refreshing', this.dataRefreshing)
    this.$root.$on('db-refreshing-complete', this.dataRefreshed)
    this.$root.$on('progress-event', this.progressEventCallback)

    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  },

  errorCaptured (err, instance, info) {
    console.warn('ERROR:\n', err, info, instance.$options._componentTag)
    return false
  }
}
</script>

<style>
html {
  max-height: 100vh !important;
  overflow: hidden !important;
}
body {
  overflow: hidden;
  /* margin-bottom: 88px; */
  background: #fbfbfb;
}
img {
  user-select: none;
}

.main-header {
  font-weight: 900;
  margin-top: -64px;
}

.v-list-item__title {
  font-size: 0.8rem !important;
}

.field-set {
  border: solid 1px #ddd;
  padding: 32px 0;
  box-shadow: 0 0 4px #0003;
}
.field-set > legend {
  font-size: 14px;
  font-weight: bold;
  color: #881F1A!important;
  background: #FBFBFB;
  border: solid 1px #ddd!important;
  box-shadow: 0 0 4px #0003;
  border-radius: 4px;
  padding: 4px 16px;
}

.v-input, .v-label {
  font-size: 14px !important;
}

.theme--light.v-list,
.theme--light.v-expansion-panels .v-expansion-panel {
  background: #FBFBFB !important;
  background-color: #FBFBFB !important;
}

@media screen and (max-width: 600px) {
  h3 {
    font-size: 20px;
  }
}
@media screen and (max-width: 420px) {
  h3 {
    font-size: 18px;
  }
}
.bottom-info-bar {
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 28px;
  background: #999;
  margin: 0!important;
  padding: 0;
  line-height: 80%;
}
.bottom-info-bar--text {
  color: #efefef;
  margin-top: -4px;
}
</style>
