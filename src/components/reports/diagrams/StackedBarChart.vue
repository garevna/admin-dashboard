<template>
  <GChart
    type="BarChart"
    :data="sourceData"
    :options="chartOptions"
  />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'StackedBarChart',

  components: {
    GChart
  },

  props: ['sourceData', 'title'],

  data: () => ({
    chartData: null,
    chartOptions: {
      isStacked: true,
      title: '',
      height: 0,
      chartArea: { width: '70%' },
      backgroundColor: '#fbfbfb',
      colors: ['#09b', '#fa0', '#090', '#900'],
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
      // colors: ['#900'],
      legend: {
        position: 'top',
        maxLines: 3
      },
      hAxis: {
        title: '',
        minValue: 0,
        textPosition: 'out',
        textStyle: {
          color: '#777',
          fontSize: 10
        },
        gridlines: {
          color: '#eee'
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

  watch: {
    sourceData: {
      deep: true,
      handler (data) {
        this.chartOptions.hAxis.title = this.title
        this.chartOptions.title = this.title
      }
    }
  },

  mounted () {
    this.chartOptions.height = this.sourceData.length * 28
    this.chartOptions.chartArea.height = this.sourceData.length * 28 - 80
    this.chartOptions.hAxis.title = this.title
    this.chartOptions.vAxis.title = this.sourceData[0][0]
  }
}
</script>
