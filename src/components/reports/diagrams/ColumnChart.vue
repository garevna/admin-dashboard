<template>
  <GChart
    type="ColumnChart"
    :data="sourceData"
    :options="chartOptions"
  />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'ColumnChart',

  components: {
    GChart
  },

  props: ['sourceData'],

  data: () => ({
    chartData: null,
    chartOptions: {
      title: '',
      height: 360,
      chartArea: { width: '70%', height: 280 },
      backgroundColor: '#fbfbfb',
      fontSize: 11,
      fontName: 'Gilroy',
      titlePosition: 'none',
      animation: {
        duration: 500,
        startup: true
      },
      titleTextStyle: {
        bold: true,
        color: '#555'
      },
      // colors: ['#ddd', '#999', '#004', '#900'],
      legend: {
        position: 'none'
      },
      hAxis: {
        title: '',
        textPosition: 'out',
        textStyle: {
          textStyle: {
            color: '#777',
            fontSize: 10
          }
        },
        ticks: []
      },
      vAxis: {
        title: '',
        minValue: 0,
        textPosition: 'out',
        textStyle: {
          color: '#777',
          fontSize: 10
        },
        gridlines: {
          interval: 1
        }
      }
    }
  }),

  watch: {
    sourceData: {
      deep: true,
      handler (data) {
        this.chartOptions.hAxis.title = this.title
        this.chartOptions.hAxis.ticks = this.sourceData.slice(1).map(item => item[0])
        this.chartOptions.title = data[0][1]
      }
    }
  },

  mounted () {
    this.chartOptions.hAxis.title = this.title
    this.chartOptions.vAxis.title = this.sourceData[0][1]
  }
}
</script>
