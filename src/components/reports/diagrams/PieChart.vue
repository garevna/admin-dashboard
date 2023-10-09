<template>
  <v-sheet color="transparent" height="420">
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
      width="420"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'PieChart',

  components: {
    GChart
  },

  props: ['title', 'chartData'],

  data: () => ({
    chartOptions: {
      backgroundColor: '#fbfbfb',
      fontSize: 11,
      fontName: 'Gilroy',
      height: 420,
      title: '',
      colors: ['#900', '#004', '#999', '#090'],
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: '',
        height: 360
      }
    }
  }),

  mounted () {
    this.chartOptions.title = this.title
    this.chartOptions.chart.title = this.title
  }
}
</script>
