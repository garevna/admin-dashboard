<template>
  <v-container class="transparent">
    <v-toolbar dark flat class="primary">
      <v-btn text small v-for="item of items" :key="item" @click="selected = item">
        {{ item }}
      </v-btn>
    </v-toolbar>

    <BarChart
      v-if="selected === 'Total connections'"
      :sourceData="chartData"
    />

    <StackedBarChart
      v-if="selected === 'Residential / Commercial'"
      :sourceData="connectionsTypesChartData"
      title="Connections"
    />

    <StackedBarChart
      v-if="selected === 'Active / Pending'"
      :sourceData="connectionsStatusChartData"
      title="Connections"
    />
  </v-container>
</template>

<script>

export default {
  name: 'PartnersConnectionsDiagram',

  components: {
    BarChart: () => import('@/components/reports/diagrams/BarChart.vue'),
    StackedBarChart: () => import('@/components/reports/diagrams/StackedBarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    items: [
      'Total connections',
      'Residential / Commercial',
      'Active / Pending'
    ],
    selected: 'Total connections',
    chart: null,
    chartData: [
      ['Partner', 'Connections']
    ],
    connectionsChartData: [
      ['Partner', 'Active', 'Pending']
    ]
  }),

  methods: {
    getSelected (item) {
      this.open = false
      this.selected = item.text
      this.buildDiagramData(item.text, item.propName)
    },

    buildConnectionsChartData () {
      this.chartData = [
        ['Partner', 'Connections']
      ]

      for (const record of this.sourceData) {
        this.chartData.push([record.name, record.connections.active])
      }

      this.connectionsTypesChartData = [
        ['Partner', 'Residential', 'Commercial']
      ]
      for (const record of this.sourceData) {
        this.connectionsTypesChartData.push([record.name, record.connections.residential, record.connections.commercial])
      }

      this.connectionsStatusChartData = [
        ['Partner', 'Active', 'Pending']
      ]
      for (const record of this.sourceData) {
        this.connectionsStatusChartData.push([record.name, record.connections.active, record.connections.pendingResidential + record.connections.pendingCommercial])
      }
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
