<template>
  <v-sheet color="transparent" height="480" class="mt-8">
    <GChart
      type="PieChart"
      :data="statusChartData"
      :options="chartOptions"
      width="480"
    />
    <GChart
      type="PieChart"
      :data="typeChartData"
      :options="activeChartOptions"
      width="480"
    />
    <GChart
      type="PieChart"
      :data="pendingChartData"
      :options="pendingChartOptions"
      width="480"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'DiagramConnections',

  components: {
    GChart
  },

  props: ['title', 'values', 'headers'],

  data: () => ({
    statusChartData: [],
    typeChartData: [],
    activeChartData: [],
    pendingChartData: [],
    chartOptions: {
      backgroundColor: '#fbfbfb',
      title: 'Connections',
      fontSize: 11,
      fontName: 'Gilroy',
      colors: ['#900', '#004'],
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        height: 360
      }
    },

    activeChartOptions: {},
    pendingChartOptions: {}

    // activeChartOptions: {
    //   backgroundColor: '#fbfbfb',
    //   title: 'Active connections',
    //   colors: ['#900', '#004'],
    //   animation: {
    //     startup: true,
    //     duration: 500
    //   },
    //   chart: {
    //     title: 'Active connections',
    //     height: 320
    //   }
    // },
    // pendingChartOptions: {
    //   backgroundColor: '#fbfbfb',
    //   colors: ['#900', '#004'],
    //   title: 'Pending connections',
    //   animation: {
    //     startup: true,
    //     duration: 500
    //   },
    //   chart: {
    //     title: 'Pending connections',
    //     height: 320
    //   }
    // }
  }),

  methods: {
    createChartData () {
      this.statusChartData = [
        ['Status', 'Amount'],
        ['Active', this.values.active],
        ['Pending', this.values.pendingResidential + this.values.pendingCommercial]
      ]

      this.typeChartData = [
        ['Status', 'Amount'],
        ['Residential', this.values.residential],
        ['Commercial', this.values.commercial]
      ]

      // this.activeChartData = [
      //   ['Active', 'Amount'],
      //   ['Residential', this.values.residential],
      //   ['Commercial', this.values.pendingCommercial]
      // ]

      this.pendingChartData = [
        ['Pending', 'Amount'],
        ['Residential', this.values.pendingResidential],
        ['Commercial', this.values.pendingCommercial]
      ]
    }
  },

  mounted () {
    this.createChartData()
    this.activeChartOptions = Object.assign({}, this.chartOptions, {
      title: 'Active connections'
    })
    this.pendingChartOptions = Object.assign({}, this.chartOptions, {
      title: 'Pending connections'
    })
  }
}
</script>
