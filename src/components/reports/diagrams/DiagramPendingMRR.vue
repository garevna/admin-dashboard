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
  name: 'DiagramPendingMRR',

  components: {
    GChart
  },

  props: ['values'],

  data: () => ({
    chartData: [],
    chartOptions: {
      backgroundColor: '#fbfbfb',
      title: 'Pending MRR',
      fontSize: 11,
      fontName: 'Gilroy',
      colors: ['#900', '#004'],
      height: 420,
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: 'Pending MRR',
        height: 420
      }
    }
  }),

  methods: {
    createChartData () {
      this.chartData = [
        ['Status', 'Amount'],
        ['Residential', this.values.residential],
        ['Commercial', this.values.commercial]
      ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
