<template>
  <v-sheet class="transparent mt-12">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      centered
      icons
      max-height="32"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#diagram">
        <v-icon>mdi-chart-bar</v-icon>
      </v-tab>

      <v-tab href="#list">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-tab>

      <v-tab href="#location" v-if="locationDynamicReady">
        <v-icon>mdi-chart-areaspline-variant</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="transparent overflow-auto">
      <v-tab-item value="diagram">
        <v-card flat class="transparent" v-if="ready">
          <DiagramLocationsBubble :sourceData="locations" />
        </v-card>
        <v-card flat class="transparent" v-if="ready">
          <DiagramLocations :sourceData="locations" />
        </v-card>
      </v-tab-item>
      <v-tab-item value="list">
        <v-card flat class="transparent" v-if="ready">
          <LocationList
            class="mt-12 mx-auto"
            :sourceData="locations"
            :locationName.sync="locationName"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item value="location">
        <v-card flat class="transparent" v-if="locationDynamicReady">
          <DiagramDynamicMRR
            :title="locationName"
            :dynamic="locationDynamic"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>

export default {
  name: 'Locations',

  components: {
    DiagramDynamicMRR: () => import('@/components/reports/diagrams/DiagramDynamicMRR.vue'),
    DiagramLocations: () => import('@/components/reports/diagrams/DiagramLocations.vue'),
    DiagramLocationsBubble: () => import('@/components/reports/diagrams/DiagramLocationsBubble.vue'),
    LocationList: () => import('@/components/reports/LocationList.vue')
  },

  data: () => ({
    tab: 'diagram',
    ready: false,
    locationName: null,
    locationDynamic: null,
    locationDynamicReady: false
  }),

  watch: {
    locationName (val) {
      if (!val) this.locationDynamicReady = false
      else {
        this.getDynamicMRR()
        this.tab = 'diagram'
      }
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
      this.tab = 'location'
      this.locationDynamicReady = true
    }
  },

  created () {
    this.__getLocations(this.dataReceivedCallback)
  }
}
</script>
