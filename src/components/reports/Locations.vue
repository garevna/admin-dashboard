<template>
  <v-sheet class="transparent mt-12">
    <v-toolbar flat dark class="primary">
      <v-tabs
        v-model="tab"
        background-color="transparent"
        centered
        icons
        max-height="32"
      >
        <v-tabs-slider color="#ff7"></v-tabs-slider>

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
      <v-btn small color="#ff9" text @click="exportToExcel">
        Export
        <v-icon small class="ml-4">mdi-table-large</v-icon>
      </v-btn>
    </v-toolbar>

    <v-tabs-items v-model="tab" class="transparent overflow-auto">
      <v-tab-item value="diagram">
        <v-card flat class="transparent" v-if="ready">
          <DiagramLocations :sourceData="locations" />
        </v-card>
      </v-tab-item>
      <v-tab-item value="list">
        <v-card flat class="transparent" v-if="ready">
          <LocationList
            class="mt-2 mx-auto"
            :sourceData="locations"
            :locationName.sync="locationName"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item value="location">
        <v-card flat class="transparent" v-if="locationDynamicReady">
          <DiagramDynamicMRR
            :header="locationName"
            :sourceData="locationDynamic"
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
    // DiagramLocationsBubble: () => import('@/components/reports/diagrams/DiagramLocationsBubble.vue'),
    LocationList: () => import('@/components/reports/LocationList.vue')
  },

  data: () => ({
    tab: 'diagram',
    ready: false,
    locationName: null,
    locationDynamic: null,
    locationDynamicReady: false,
    currentMonth: new Date().toISOString().slice(0, 7)
  }),

  watch: {
    locationName (val) {
      this.tab = val ? 'diagram' : 'location'
      if (!val) this.locationDynamicReady = false
      else this.getDynamicMRR()
    }
  },

  methods: {
    dataReceivedCallback (data) {
      this.locations = data
      for (const localityName in data) {
        Object.assign(this.locations[localityName], {
          MRR: data[localityName].dynamic[this.currentMonth]
        })
      }
      this.ready = true
    },

    getDynamicMRR () {
      this.showDynamicDiagram(this.locations[this.locationName].dynamic)
      // this.__getLocationDynamic(this.locationName, this.showDynamicDiagram)
    },

    showDynamicDiagram (data) {
      this.locationDynamic = Object.assign({}, { dynamic: data })
      this.tab = 'location'
      this.locationDynamicReady = true
    },

    exportToExcel () {
      this.$router.push({ name: 'export-locations-overview' })
    }
  },

  created () {
    this.__getLocations(this.dataReceivedCallback)
  }
}
</script>
