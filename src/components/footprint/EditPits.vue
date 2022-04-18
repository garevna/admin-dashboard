<template>
  <v-card flat class="transparent">
    <Pits
      :host="apiHost"
      :apiKey="apiKey"
      :credentials="credentials"
    />
  </v-card>
</template>

<script>

import { credentialsHandler } from '@/controllers/data-handlers/credentialsHandler'
import Components from 'dgtek-portal-pits-editor'
import 'dgtek-portal-pits-editor/dist/dgtek-portal-pits-editor.css'

// const { Pits } = Components

export default {
  name: 'EditPitss',

  components: {
    Pits: Components.Pits
  },

  data: () => ({
    apiHost: location.origin === 'https://dka.portal.dgtek.net' ? 'https://portal.dgtek.net' : 'https://portal.staging.dgtek.net',
    apiKey: process.env.VUE_APP_AUTHORIZATION_KEY,
    credentials: credentialsHandler(),
    readyKML: false,
    href: null
  }),

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
