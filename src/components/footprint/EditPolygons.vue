<template>
  <Polygons
    :host="apiHost"
    :apiKey="apiKey"
    :credentials="credentials"
  />
</template>

<script>

import { credentialsHandler } from '@/controllers/data-handlers/credentialsHandler'
// import Polygons from 'dgtek-portal-polygons-editor'
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
    credentials: credentialsHandler()
  }),

  beforeMount () {
    this.__removeGoogleMaps()
  },

  beforeDestroy () {
    this.__removeGoogleMaps()
  }
}
</script>
