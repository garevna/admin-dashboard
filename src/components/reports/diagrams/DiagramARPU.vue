<template>
  <v-sheet color="transparent" height="480" class="mt-12">
    <GChart
      type="BarChart"
      :data="chartData"
      :options="chartOptions"
      width="480"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

import { getARPU } from '@/components/reports/helpers'

export default {
  name: 'DiagramARPU',

  components: {
    GChart
  },

  props: ['sourceData'],

  data: () => ({
    chartData: [],
    chartOptions: {
      backgroundColor: '#fbfbfb',
      title: 'ARPU',
      legend: { position: 'none' },
      fontSize: 11,
      fontName: 'Gilroy',
      animation: {
        duration: 500,
        startup: true
      },
      chart: {
        title: 'ARPU',
        height: 320
      },
      hAxis: {
        minValue: 0
      }
    }
  }),

  methods: {
    createChartData () {
      const { residential, commercial } = getARPU(this.sourceData)

      this.chartData = [
        ['Status', 'Amount', { role: 'style' }],
        ['Residential', parseFloat(residential.slice(1)), 'color: #900'],
        ['Commercial', parseFloat(commercial.slice(1)), 'color: #004']
      ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
