<template>
  <v-row class="mb-12">
    <v-col cols="5">
      <v-card dark class="mt-12 pa-4" color="#003" width="600">
        <BuildingsDash
          v-if="ready"
          :overviewData="overviewData"
          :clicked.sync="selectedPostCode"
          :clickedOption.sync="selectedOption"
        />
      </v-card>
    </v-col>
    <v-col cols="7">
      <v-sheet
        color="transparent"
        height="480"
        class="mt-8"
      >
        <OverviewDiagram
          v-if="showOverview && !showBuildingList"
          :sourceData="overviewData"
        />

        <BuildingList
          v-if="showBuildingList"
          :postCode="selectedPostCode"
        />

      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'BuildingsPage',

  components: {
    BuildingsDash: () => import('@/components/reports/BuildingsDash.vue'),
    OverviewDiagram: () => import('@/components/reports/diagrams/buildings/OverviewDiagram.vue'),
    BuildingList: () => import('@/components/reports/BuildingList.vue')
  },

  data: () => ({
    ready: false,
    overviewData: null,
    showOverview: false,

    buildingData: null,

    selectedPostCode: undefined,
    selectedOption: 0,

    buildingList: [],
    showBuildingList: false,

    showBuilding: false
  }),

  watch: {
    selectedPostCode (postCode) {
      this.showBuildingList = false

      if (!postCode) {
        this.showOverview = true
      } else {
        this.showBuildingList = true
        this.showOverview = false
        this.$nextTick(() => { this.showBuildingList = true })
      }
    }
  },

  methods: {
    getOverviewData (data) {
      this.overviewData = data
      this.showOverview = true
      this.showBuildingList = false
      this.ready = true
    }
  },

  created () {
    this.__getBuildingsOverview(this.getOverviewData)
  }
}
</script>
