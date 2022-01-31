<template>
  <v-card flat class="transparent">
    <v-toolbar flat class="transparent">
      <span class="pa-3 mr-2" style="background-color: #0909"></span>
      <span class="mx-2">Service available</span>
      <span class="pa-3 mx-2" style="background-color: #0007"></span>
      <span class="mx-2">Build commenced</span>
      <span class="pa-3 mr-x" style="background-color: #fa07"></span>
      <span class="mx-2">Coming soon</span>
      <!-- <v-spacer /> -->
      <v-btn class="ml-10" outlined @click="convertToKML">
        Convert DGtek polygons to KML format
      </v-btn>
      <a v-if="readyKML" download="dgtek-polygons.kml" :href="href"> Download </a>
    </v-toolbar>
    <Polygons
      :host="apiHost"
      :apiKey="apiKey"
      :credentials="credentials"
    />
  </v-card>
</template>

<script>

import { credentialsHandler } from '@/controllers/data-handlers/credentialsHandler'
import 'dgtek-portal-polygons-editor/dist/dgtek-portal-polygons-editor.css'

const { Polygons } = require('dgtek-portal-polygons-editor').default

export default {
  name: 'EditPolygons',

  components: {
    Polygons
  },

  data: () => ({
    apiHost: location.origin === 'https://dka.portal.dgtek.net' ? 'https://portal.dgtek.net' : 'https://portal.staging.dgtek.net',
    apiKey: process.env.VUE_APP_AUTHORIZATION_KEY,
    credentials: credentialsHandler(),
    readyKML: false,
    href: null
  }),

  methods: {
    convertToKML () {
      this.__convertPolygonsToKML(this.converted)
    },

    converted (blob) {
      this.href = URL.createObjectURL(blob)
      this.readyKML = true
    }
  },

  beforeMount () {
    this.__removeGoogleMaps()
  },

  beforeDestroy () {
    this.__removeGoogleMaps()
  }
}
</script>

<style scoped>

a {
  border: solid 1px #900;
  margin-left: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
}
</style>
