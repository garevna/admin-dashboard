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
      />

      <transition name="page-fade-transition" mode="out-in">
        <router-view />
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
      <v-col cols="4">
        <v-btn icon small style="margin-top: -10px" @click="showDebuggerConsole">
          <v-icon small color="#fa0d"> mdi-alert-box </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4">
        <p class="text-center bottom-info-bar--text" style="position: relative">
          <small>
            <sub>2021 &copy; Dgtek Pty. Ltd ABN 61 600 896 115</sub>
          </small>
        </p>
      </v-col>
      <v-col cols="4">
        <p class="text-right mr-2 bottom-info-bar--text">
          <small v-if="developmentMode">
            <v-icon small color="#ff7" class="mt-1"> mdi-alert-outline </v-icon>
            <sub style="color: #ddd"> Staging release <b style="color: #fff">{{ devReleaseVersion }}</b> ({{ releaseDate }}) </sub>
          </small>
          <small v-else>
            <sub style="color: #ddd"> Release <b style="color: #fff">{{ gitTagNumber }}</b> ({{ releaseDate }}) </sub>
          </small>
        </p>
      </v-col>
    </v-row>

    <error-message />
    <errors-panel />
    <simple-message />
    <customer-info />
    <confirmation-popup />
    <debug-console />
  </v-app>
</template>

<script>

import '@/sass/main.scss'
import 'dgtek-styles'

const servicesImage = require('@/assets/images/melbourne-2-1.svg')
const homeImage = require('@/assets/images/Webb-Bridge-Melbourne-Drawing-effect.svg')

export default {
  name: 'App',

  data: () => ({
    developmentMode: false,
    devReleaseVersion: process.env.DEVELOPMENT_RELEASE_VERSION,
    prodReleaseVersion: process.env.PRODUCTION_RELEASE_VERSION,
    gitTagNumber: process.env.GIT_TAG,
    releaseDate: document.documentElement.dataset.buildTimestampUtc,
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
    },

    showDebuggerConsole () {
      this.$root.$emit('open-debugger-console')
    },

    showSnackBar (message) {
      this.snackbar = true
      this.message = message
    },

    hideSnackBar () {
      this.snackbar = false
      this.message = ''
    }
  },

  beforeDestroy () {
    this.$root.$off('page-of-customers-received', this.pageOfCustomersReceived)

    this.$root.$off('show-snack-bar', this.showSnackBar)
    this.$root.$off('hide-snack-bar', this.hideSnackBar)

    this.$root.$off('app-is-ready', this.setReady)
    this.$root.$off('db-refreshing', this.dataRefreshing)
    this.$root.$off('db-refreshing-complete', this.dataRefreshed)
    this.$root.$off('progress-event', this.progressEventCallback)
  },

  beforeMount () {
    this.developmentMode = location.hostname !== 'dka.portal.dgtek.net'
  },

  mounted () {
    this.$root.$on('show-snack-bar', this.showSnackBar)
    this.$root.$on('hide-snack-bar', this.hideSnackBar)

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
