<template>
  <v-sheet color="transparent" height="480" class="mt-8">
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
      width="320"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'DiagramUptake',

  components: {
    GChart
  },

  props: ['values'],

  data: () => ({
    chartData: [],
    chartOptions: {
      backgroundColor: '#fbfbfb',
      title: 'Uptake',
      colors: ['#09b', '#900', '#f50'],
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: 'Uptake',
        height: 320
      }
    }
  }),

  methods: {
    createChartData () {
      const { residential, commercial } = this.values.connections
      const { premisesPassed } = this.values

      this.chartData = [
        ['Type', '%'],
        ['Premises passed', premisesPassed.total - residential - commercial],
        ['Residential', residential],
        ['Commercial', commercial]
      ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
