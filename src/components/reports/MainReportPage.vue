<template>
  <v-card flat class="transparent mx-auto" width="90%" v-if="ready">
    <TopOfPage :overviewData="overviewData" />

    <MainReportTabs :tab.sync="tab" />

    <OverviewPage v-if="tab === 0" :overviewData="overviewData" />
  </v-card>

</template>

<script>

export default {
  name: 'MainReportPage',

  components: {
    TopOfPage: () => import('@/components/reports/TopOfPage.vue'),
    MainReportTabs: () => import('@/components/reports/MainReportTabs.vue'),
    OverviewPage: () => import('@/components/reports/OverviewPage.vue')
  },

  data: () => ({
    ready: false,
    tab: 0,
    overviewData: null
  }),

  methods: {
    setActive (index) {
      this.active = [false, false, false, false, false]
      this.active[index] = true
    },

    calcReport (response) {
      this.__calculateReports(this.getOverview)
    },

    getOverview () {
      this.__getOverview(this.showOverview)
    },

    showOverview (data) {
      this.overviewData = data

      this.showDiagram = true
      this.ready = true
    }
  },

  created () {
    this.__createReport(this.calcReport)
  }
}
</script>
