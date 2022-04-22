<template>
  <v-sheet class="transparent mt-12">
    <DiagramLocations
      v-if="ready"
      :sourceData="locations"
    />
    <LocationList
      class="mt-12 mx-auto"
      v-if="ready"
      :sourceData="locations"
    />
  </v-sheet>
</template>

<script>

export default {
  name: 'Locations',

  components: {
    DiagramLocations: () => import('@/components/reports/diagrams/DiagramLocations.vue'),
    LocationList: () => import('@/components/reports/LocationList.vue')
  },

  data: () => ({
    ready: false
  }),

  methods: {
    dataReceivedCallback (data) {
      this.locations = data
      this.ready = true
    }
  },

  created () {
    this.__getLocations(this.dataReceivedCallback)
  }
}
</script>
