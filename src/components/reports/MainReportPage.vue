<template>
  <v-card flat class="transparent mx-auto" width="90%" v-if="ready">
    <TopOfPage :overviewData="overviewData" />

    <v-row justify="center" class="mt-12">
      <v-btn
        :dark="active[0]"
        :class="active[0] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(0)"
      >
        <Overview style="position: absolute; left: -12px" />
        <b class="ml-8"> Overview </b>
      </v-btn>

      <v-btn
        :dark="active[1]"
        :class="active[1] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(1)"
      >
        <Financials style="position: absolute; left: -12px" />
        <b class="ml-8"> Financials </b>
      </v-btn>

      <v-btn
        :dark="active[2]"
        :class="active[2] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(2)"
      >
        <Buildings style="position: absolute; left: -12px" />
        <b class="ml-8"> Buildings </b>
      </v-btn>

      <v-btn
        :dark="active[3]"
        :class="active[3] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(3)"
      >
        <ARPU style="position: absolute; left: -12px" />
        <b class="ml-8"> ARPU </b>
      </v-btn>

      <v-btn
        :dark="active[4]"
        :class="active[4] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(4)"
      >
        <Forecast style="position: absolute; left: -12px" />
        <b class="ml-8"> Forecast </b>
      </v-btn>
    </v-row>

    <v-row class="mb-12">
      <v-col cols="5">
        <v-card dark class="mt-12 pa-8" color="#003" width="600">
          <OverviewDash :overviewData="overviewData" :clicked.sync="overviewClickedItem" />
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-sheet color="transparent" height="480" class="mt-8" v-if="showDiagram">
          <DiagramMRR
            v-if="overviewClickedItem === 'MRR-active' || overviewClickedItem === 'MRR-pending'"
            :overviewData="overviewData"
            :collectionName="collectionName"
          />
          <Diagram v-else :diagramType="diagramType" :title="diagramTitle" :values="diagramData" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>

import {
  Overview,
  Financials,
  Forecast,
  ARPU,
  Buildings
} from '@/components/icons'

export default {
  name: 'MainReportPage',

  components: {
    Overview,
    Financials,
    Forecast,
    ARPU,
    Buildings,
    TopOfPage: () => import('@/components/reports/TopOfPage.vue'),
    OverviewDash: () => import('@/components/reports/OverviewDash.vue'),
    Diagram: () => import('@/components/reports/diagrams/Diagram.vue'),
    DiagramMRR: () => import('@/components/reports/diagrams/DiagramMRR.vue')
  },

  data: () => ({
    ready: false,
    active: [true, false, false, false, false],
    diagram: '',
    diagramType: 'bars',
    diagramTitle: 'Diagram title',
    diagramData: null,
    showDiagram: false,
    overviewData: null,
    overviewClickedItem: null,
    collectionName: 'active'
  }),

  watch: {
    overviewClickedItem (val) {
      if (val === 'MRR-active' || val === 'MRR-pending') {
        this.collectionName = val.slice(4)
      }
    }
  },

  methods: {
    setActive (index) {
      this.active = [false, false, false, false, false]
      this.active[index] = true
      if (index < 3) {
        this.overviewClickedItem = 'MRR'
        this.collectionName = index < 2 ? 'active' : 'pending'
      }
    },

    calcReport (response) {
      this.__calculateReports(this.getOverview)
    },

    getOverview () {
      this.__getOverview(this.showOverview)
    },

    showOverview (data) {
      this.overviewData = data

      this.diagramData = [
        ['MRR(+)', 'Year and month'],
        ...Object.keys(data.active.residential).map(key => ([key, data.active.residential[key]])),
        ...Object.keys(data.active.commercial).map(key => ([key, data.active.commercial[key]]))
      ]

      this.showDiagram = true
      this.ready = true
    }
  },

  created () {
    this.__createReport(this.calcReport)
    this.diagramType = 'bars'
    this.diagramTitle = 'New connections (MRR+)'
  }
}
</script>
