<template>
  <GChart
    type="BarChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'BarChart',

  components: {
    GChart
  },

  props: ['sourceData', 'color'],

  data: () => ({
    // chartData: null,
    chartOptions: {
      title: '',
      height: 0,
      chartArea: { width: '70%' },
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
      colors: ['#004'],
      legend: {
        position: 'none'
      },
      hAxis: {
        title: '',
        minValue: 0,
        textPosition: 'out',
        textStyle: {
          textStyle: {
            color: '#777',
            fontSize: 10
          }
        }
      },
      vAxis: {
        viewWindowMode: 'maximized',
        title: '',
        textPosition: 'out',
        textStyle: {
          color: '#777',
          fontSize: 10
        }
      }
    }
  }),

  computed: {
    chartData () {
      const chartData = this.sourceData
      chartData.forEach((item, index) => item.push(!index ? { role: 'style' } : (item[1] < 0 ? '#d00' : '#004')))
      return chartData
    }
  },

  watch: {
    sourceData: {
      deep: true,
      handler (data) {
        this.chartOptions.hAxis.title = data[0][1]
        this.chartOptions.title = data[0][1]
      }
    }
  },

  mounted () {
    this.chartOptions.height = this.sourceData.length * 28
    this.chartOptions.chartArea.height = this.sourceData.length * 28 - 60
    this.chartOptions.hAxis.title = this.sourceData[0][1]
    this.chartOptions.vAxis.title = this.sourceData[0][0]
    // this.chartOptions.title = this.title || this.sourceData[0][1]
  }
}
</script>
