<template>
  <v-row class="mb-12">
    <v-col cols="6">
      <v-card dark class="mt-12 pa-4" color="#003" width="600">
        <OverviewDash
          :overviewData="overviewData"
          :clicked.sync="overviewClickedItem"
        />
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-sheet
        v-if="showDiagram"
        color="transparent"
        height="480"
        class="mt-8"
      >
        <v-card flat class="transparent mt-12" v-if="dynamic">
          <v-toolbar flat dark class="primary">
            <v-toolbar-title> <small> MRR </small> </v-toolbar-title>
            <v-spacer />
            <v-btn small color="#ff9" text @click="exportToExcel">
              Export
              <v-icon small class="ml-4">mdi-table-large</v-icon>
            </v-btn>
          </v-toolbar>
          <DiagramDynamicMRR :clickedItem="overviewClickedItem" :sourceData="overviewData" />
        </v-card>

        <Locations v-if="overviewClickedItem === 'buildings'" />

        <DiagramPendingMRR v-if="overviewClickedItem === 'MRR-pending'" :values="overviewData.MRR.pending" />

        <DiagramPremisesPassed v-if="premises" :values="overviewData.premisesPassed" />

        <DiagramARPU v-if="arpu" :sourceData="overviewData" />

        <DiagramConnections v-if="overviewClickedItem === 'connections'" :values="overviewData.connections" />

        <DiagramUptake v-if="overviewClickedItem === 'Uptake'" :values="overviewData" />

      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

import { dynamicMenuItems } from '@/components/reports/configs'

export default {
  name: 'OverviewPage',

  components: {
    OverviewDash: () => import('@/components/reports/OverviewDash.vue'),
    DiagramPendingMRR: () => import('@/components/reports/diagrams/DiagramPendingMRR.vue'),
    DiagramConnections: () => import('@/components/reports/diagrams/DiagramConnections.vue'),
    DiagramPremisesPassed: () => import('@/components/reports/diagrams/DiagramPremisesPassed.vue'),
    DiagramDynamicMRR: () => import('@/components/reports/diagrams/DiagramDynamicMRR.vue'),
    DiagramARPU: () => import('@/components/reports/diagrams/DiagramARPU.vue'),
    DiagramUptake: () => import('@/components/reports/diagrams/DiagramUptake.vue'),
    Locations: () => import('@/components/reports/Locations.vue')
  },

  props: ['overviewData'],

  data: () => ({
    ready: false,
    showDiagram: false,
    overviewClickedItem: null
  }),

  computed: {
    dynamic () {
      return dynamicMenuItems.includes(this.overviewClickedItem)
    },

    premises () {
      return ['premises', 'total-residential-premises', 'total-commercial-premises', 'total-mixed-premises'].includes(this.overviewClickedItem)
    },

    arpu () {
      return ['ARPU', 'ARPU-residential', 'ARPU-commercial'].includes(this.overviewClickedItem)
    },

    premisesType () {
      return this.premises ? this.overviewClickedItem.slice(6, -9) : null
    }
  },

  watch: {
    overviewClickedItem (val) {
      this.showDiagram = true
    }
  },

  methods: {
    exportToExcel () {
      this.$router.push({ name: 'export-mrr-dynamic' })
    }
  }
}
</script>
