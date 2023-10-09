<template>
  <v-card flat class="transparent mx-auto" width="90%" v-if="ready">
    <TopOfPage :overviewData="overviewData" />

    <MainReportTabs
      :tab.sync="tab"
      :partnersReady="partnersReady"
    />

    <v-btn icon @click="refresh">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>

    <OverviewPage v-if="tab === 0" :overviewData="overviewData" />

    <PartnersPage v-if="tab === 5 && partnersReady" />

    <BuildingsPage v-if="tab === 2" />
  </v-card>

</template>

<script>

import { lastCalcTimestamp } from '@/components/reports/helpers'

export default {
  name: 'MainReportPage',

  components: {
    TopOfPage: () => import('@/components/reports/TopOfPage.vue'),
    MainReportTabs: () => import('@/components/reports/MainReportTabs.vue'),
    OverviewPage: () => import('@/components/reports/OverviewPage.vue'),
    PartnersPage: () => import('@/components/reports/PartnersPage.vue'),
    BuildingsPage: () => import('@/components/reports/BuildingsPage.vue')
  },

  props: ['section'],

  data: () => ({
    ready: false,
    partnersReady: false,
    tab: 0,
    overviewData: null
  }),

  watch: {
    section: {
      immediate: true,
      handler (val) {
        const sections = ['overview', '', 'buildings', '', '', 'partners', '', '']

        this.tab = sections.indexOf(val)
        this.ready = this.ready && this.tab !== -1
      }
    }
  },

  methods: {
    refresh () {
      this.ready = false
      lastCalcTimestamp(true)
      this.__createReport(this.calcReport)
    },

    calcReport () {
      this.$root.$emit('clear-debugger-console', { key: 'broken-link' })
      this.__calculateReports(this.getOverview)
    },

    getOverview () {
      this.__getOverview(this.showOverview)
      this.partnersReady = true
    },

    showOverview (data) {
      this.overviewData = data

      this.showDiagram = true
      this.ready = true
    }
  },

  created () {
    lastCalcTimestamp() ? this.__createReport(this.calcReport) : this.getOverview()
  }
}
</script>
