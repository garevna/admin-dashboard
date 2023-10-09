<template>
  <v-sheet color="transparent" height="480" class="mt-12">
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
      width="480"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'DiagramPremisesPassed',

  components: {
    GChart
  },

  props: ['values'],

  data: () => ({
    chartData: [],
    chartOptions: {
      backgroundColor: '#fbfbfb',
      fontSize: 11,
      fontName: 'Gilroy',
      height: 420,
      title: 'Total premises passed',
      colors: ['#900', '#004', '#999'],
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: 'Total premises passed',
        height: 320
      }
    }
  }),

  methods: {
    createChartData () {
      this.chartData = [
        ['Status', 'Amount'],
        ['Residential', this.values.residential],
        ['Commercial', this.values.commercial],
        ['Mixed', this.values.mixed]
      ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
