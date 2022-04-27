<template>
  <v-sheet class="transparent mt-12" v-if="ready">
    <DiagramDynamicMRR
      v-if="locationDynamicReady"
      :title="locationName"
      :dynamic="locationDynamic"
    />
    <DiagramLocations
      v-else
      :sourceData="locations"
    />
    <LocationList
      class="mt-12 mx-auto"
      :sourceData="locations"
      :locationName.sync="locationName"
    />
  </v-sheet>
</template>

<script>

export default {
  name: 'Locations',

  components: {
    DiagramDynamicMRR: () => import('@/components/reports/diagrams/DiagramDynamicMRR.vue'),
    DiagramLocations: () => import('@/components/reports/diagrams/DiagramLocations.vue'),
    LocationList: () => import('@/components/reports/LocationList.vue')
  },

  data: () => ({
    ready: false,
    locationName: null,
    locationDynamic: null,
    locationDynamicReady: false
  }),

  watch: {
    locationName (val) {
      if (!val) this.locationDynamicReady = false
      else this.getDynamicMRR()
    }
  },

  methods: {
    dataReceivedCallback (data) {
      this.locations = data
      this.ready = true
    },

    getDynamicMRR () {
      this.__getLocationDynamic(this.locationName, this.showDynamicDiagram)
    },

    showDynamicDiagram (data) {
      this.locationDynamic = data
      this.locationDynamicReady = true
    }
  },

  created () {
    this.__getLocations(this.dataReceivedCallback)
  }
}
</script>
