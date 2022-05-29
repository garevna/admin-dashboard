<template>
  <v-card flat class="transparent mx-auto" width="90%" v-if="ready">
    <TopOfPage :overviewData="overviewData" />

    <MainReportTabs
      :tab.sync="tab"
      :partnersReady="partnersReady"
    />

    <OverviewPage v-if="tab === 0" :overviewData="overviewData" />

    <PartnersPage v-if="tab === 5 && partnersReady" />
  </v-card>

</template>

<script>

export default {
  name: 'MainReportPage',

  components: {
    TopOfPage: () => import('@/components/reports/TopOfPage.vue'),
    MainReportTabs: () => import('@/components/reports/MainReportTabs.vue'),
    OverviewPage: () => import('@/components/reports/OverviewPage.vue'),
    PartnersPage: () => import('@/components/reports/PartnersPage.vue')
  },

  data: () => ({
    ready: false,
    partnersReady: false,
    tab: 0,
    overviewData: null
  }),

  watch: {
    tab (val) {
      if (val === 5) {
        if (!this.partnersReady) this.__calculatePartners(this.setPartnersReady)
        // else this.getOverview(this.getOverview)
      }
    }
  },

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
    },

    setPartnersReady () {
      console.log('PARTNER\'s data ready')
      this.partnersReady = true
    }
  },

  created () {
    this.__createReport(this.calcReport)
    this.__calculatePartners(this.setPartnersReady)
  }
}
</script>
