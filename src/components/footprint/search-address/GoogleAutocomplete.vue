<template>
  <DgtekGoogleAutocomplete v-if="mapIsReady" />
</template>

<script>

import 'dgtek-google-autocomplete/dist/dgtek-google-autocomplete.css'

const { DgtekGoogleAutocomplete } = require('dgtek-google-autocomplete').default

export default {
  name: 'GoogleAutocomplete',

  components: {
    DgtekGoogleAutocomplete
  },

  props: ['building'],

  data: () => ({
    mapIsReady: false
  }),

  methods: {
    catchEvent (event) {
      const { address, addressComponents, status, buildingId, url, coordinates, estimatedServiceDeliveryTime } = event.detail

      this.$emit('update:building', { address, addressComponents, status, buildingId, url, coordinates, estimatedServiceDeliveryTime })
    }
  },

  beforeDestroy () {
    window.removeEventListener('new-address-data', this.catchEvent)
  },

  mounted () {
    function waitForGoogleMaps () {
      if (!window.google) window.requestAnimationFrame(waitForGoogleMaps.bind(this))
      else this.mapIsReady = true
    }

    window.requestAnimationFrame(waitForGoogleMaps.bind(this))

    this.$emit('update:building', null)

    window.addEventListener('new-address-data', this.catchEvent)
  }
}
</script>
