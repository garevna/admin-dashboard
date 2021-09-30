<template>
  <v-card flat class="transparent">
    <h5>Check the service availability by typing the address in the textbox below</h5>
    <v-card
      id="container-for-map"
      ref="container-for-map"
      width="100%"
      height="480"
      class="transparent"
    />
  </v-card>
</template>

<script>

import DgtekMap from 'dgtek-portal-map-package'

const { dgtekMapEvents } = require('@/configs').default

let container = null

export default {
  name: 'MapSearch',

  props: ['building'],

  data: () => ({
    map: null,
    events: dgtekMapEvents
  }),

  methods: {
    catchEvent (event) {
      const { address, addressComponents, coordinates, status, buildingId, estimatedServiceDeliveryTime } = event.data
      this.$emit('update:building', { address, addressComponents, coordinates, status, buildingId, estimatedServiceDeliveryTime })
    }
  },

  beforeDestroy () {
    this.events.forEach(eventName => container.removeEventListener(eventName, this.catchEvent))
  },

  mounted () {
    container = document.getElementById('container-for-map')
    this.events.forEach(eventName => container.addEventListener(eventName, this.catchEvent))

    window.google = null

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })

    this.events.getEventName = function (status) {
      for (const key in this) {
        if (this[key].includes(status)) return key
      }
    }
  }
}

</script>
