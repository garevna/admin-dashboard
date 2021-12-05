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

let container = null

export default {
  name: 'MapSearch',

  props: ['building'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    map: null
  }),

  methods: {
    catchEvent (data) {
      const { address, addressComponents, coordinates, status, uniqueCode, buildingId, estimatedServiceDeliveryTime } = data
      this.$emit('update:building', { address, addressComponents, coordinates, status, uniqueCode, buildingId, estimatedServiceDeliveryTime })
    }
  },

  mounted () {
    container = document.getElementById('container-for-map')

    this.worker.searchCallback = this.catchEvent

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })
  }
}

</script>
