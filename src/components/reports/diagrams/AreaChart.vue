<template>
  <v-sheet color="transparent" height="480" class="mt-8">
    <table>
      <tr class="justify-center">
        <td width="140">
        </td>
        <td width="140">
          <v-select class="area-chart" :items="dates" v-model="from" label="From" outlined dense hide-details />
        </td>
        <td width="140">
          <v-select class="area-chart" :items="dates.filter(item => item > from)" v-model="to" label="To" outlined dense hide-details />
        </td>
      </tr>
    </table>

    <GChart
      type="AreaChart"
      :data="filteredItems"
      :options="chartOptions"
      style="height: 300px"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'AreaChart',

  components: {
    GChart
  },

  props: ['sourceData', 'title', 'header'],

  data: () => ({
    dates: [],
    from: null,
    to: null,
    chartData: null,
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
        title: 'Year-month',
        minValue: 0,
        textPosition: 'out',
        textStyle: {
          color: '#777'
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

  computed: {
    filteredItems () {
      if (!this.from || !this.to || this.from > this.to) return this.chartData

      const array = this.chartData.filter(item => item[0] <= this.to && item[0] >= this.from)
      array.unshift(['Year-Month', 'MRR'])

      return array
    }
  },

  watch: {
    title (val) {
      this.chartOptions.vAxis.title = this.title || 'MRR'
    },
    sourceData: {
      deep: true,
      handler (data) {
        this.getCollection()
      }
    },
    header (val) {
      this.chartOptions.title = val
    }
  },

  methods: {
    getCollection () {
      this.chartData = [
        ['Year-Month', this.title]
      ]

      this.dates = Object.keys(this.sourceData).sort()
      this.from = this.dates.slice(-8)[0]
      this.to = this.dates.slice(-1)[0]

      for (const date of this.dates) {
        this.chartData.push([date, this.sourceData[date] || 0])
      }

      this.ready = true
    }
  },

  mounted () {
    this.getCollection()
    this.chartOptions.vAxis.title = this.title || 'MRR'
  }
}
</script>

<style>
.area-chart .v-select__selection {
  font-size: 12px !important;
}
</style>
