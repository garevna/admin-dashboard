<template>
  <v-container class="transparent">
    <v-toolbar dark flat class="primary">
      <v-btn text small v-for="item of items" :key="item" @click="selected = item">
        {{ item }}
      </v-btn>
    </v-toolbar>

    <BarChart
      v-if="selected === 'Active connections'"
      :sourceData="chartData"
    />
  </v-container>
</template>

<script>

export default {
  name: 'OverviewConnectionsDiagram',

  components: {
    BarChart: () => import('@/components/reports/diagrams/BarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    items: [
      'Active connections'
    ],
    selected: 'Active connections',
    chart: null,
    chartData: [
      ['Post code', 'Active connections']
    ]
  }),

  methods: {
    getSelected (item) {
      this.open = false
      this.selected = item.text
      this.buildDiagramData(item.text, item.propName)
    },

    buildConnectionsChartData () {
      const data = Object.keys(this.sourceData)
        .map(postCode => [postCode, this.sourceData[postCode].activeCustomers])
      this.chartData = [
        ['Post code', 'Active connections'],
        ...data
      ]
    }
  },

  beforeMount () {
    this.buildConnectionsChartData()
  }
}
</script>

<style>
.this-component-menu {
  margin-top: 200px !important;
  z-index: 100;
}
</style>
