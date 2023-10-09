<template>
  <v-container class="transparent">
    <StackedBarChart
      :sourceData="chartData"
      title="Services"
    />
  </v-container>
</template>

<script>

export default {
  name: 'OverviewTotalSpentDiagram',

  components: {
    StackedBarChart: () => import('@/components/reports/diagrams/StackedBarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    items: ['Active', 'Pending'],
    chartData: []
  }),

  methods: {
    buildChartData () {
      this.chartData = [
        ['Building'].concat(this.items)
      ]
      for (const record of this.sourceData) {
        this.chartData.push([
          record.name,
          record.services.active,
          record.services.pending
        ])
      }
    }
  },

  beforeMount () {
    this.buildChartData()
  }
}
</script>

<style>
.this-component-menu {
  margin-top: 200px !important;
  z-index: 100;
}
</style>
