<template>
  <portal-google-autocomplete v-if="mapIsReady" :host="$buildingsHost()" />
</template>

<script>

export default {
  name: 'GoogleAutocomplete',

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
    window.removeEventListener('submit-address', this.catchEvent)
  },

  mounted () {
    function waitForGoogleMaps () {
      if (!window.google) window.requestAnimationFrame(waitForGoogleMaps.bind(this))
      else this.mapIsReady = true
    }

    window.requestAnimationFrame(waitForGoogleMaps.bind(this))

    this.$emit('update:building', null)

    window.addEventListener('submit-address', this.catchEvent)
  }
}
</script>
