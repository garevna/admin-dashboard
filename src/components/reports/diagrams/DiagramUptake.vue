<template>
  <v-sheet color="transparent" height="480" class="mt-12">
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
      width="480"
    />
    <!-- <GChart
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
      width="480"
    /> -->
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
      height: 600,
      backgroundColor: '#fbfbfb',
      title: 'Uptake',
      fontSize: 11,
      fontName: 'Gilroy',
      // colors: ['#09b', '#900', '#ddd'],
      colors: ['#999', '#09b', '#fa0'],
      legend: { position: 'top', maxLines: 3 },
      // pieHole: 0.4,
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: 'Uptake',
        height: 480
      },
      chartArea: {
        width: '90%',
        height: '90%'
      },
      isStacked: true
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

      // this.chartData = [
      //   ['', 'Residential', 'Commercial', 'Premises passed'],
      //   ['', residential, commercial, premisesPassed.total - residential - commercial]
      //   // ['', 'Residential', 'Commercial'],
      //   // ['', residential, commercial]
      // ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
