<template>
  <GChart
    type="AreaChart"
    :data="sourceData"
    :options="chartOptions"
  />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'AreaChart',

  components: {
    GChart
  },

  props: ['sourceData'],

  data: () => ({
    chartData: null,
    chartOptions: {
      title: '',
      height: 0,
      chartArea: { width: '70%' },
      backgroundColor: '#fbfbfb',
      fontSize: 10,
      fontName: 'Gilroy',
      titlePosition: 'none',
      animation: {
        duration: 500,
        startup: true
      },
      titleTextStyle: {
        fontSize: 11,
        bold: true,
        color: '#555',
        fontName: 'Gilroy'
      },
      colors: ['#900'],
      legend: {
        position: 'none'
      },
      explorer: {
        actions: ['dragToPan', 'rightClickToReset', 'dragToZoom'],
        maxZoomIn: 0.5,
        maxZoomOut: 2
      },
      hAxis: {
        title: '',
        minValue: 0,
        textPosition: 'out',
        textStyle: {
          color: '#777',
          fontSize: 10,
          fontName: 'Gilroy'
        }
      },
      vAxis: {
        viewWindowMode: 'maximized',
        title: '',
        textPosition: 'out',
        textStyle: {
          color: '#777',
          fontSize: 10,
          fontName: 'Gilroy'
        }
      }
    }
  }),

  watch: {
    sourceData: {
      deep: true,
      handler (data) {
        console.log(data)
        this.chartOptions.hAxis.title = data[0][1]
        this.chartOptions.title = data[0][1]
      }
    }
  },

  mounted () {
    this.chartOptions.height = this.sourceData.length * 24
    this.chartOptions.chartArea.height = this.sourceData.length * 24 - 48
    this.chartOptions.hAxis.title = this.sourceData[0][1]
    this.chartOptions.vAxis.title = this.sourceData[0][0]
    // this.chartOptions.title = this.title || this.sourceData[0][1]
  }
}
</script>
