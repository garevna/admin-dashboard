<template>
  <v-sheet color="transparent" height="480" class="mt-8">
    <table>
      <tr class="justify-center">
        <td width="140">
        </td>
        <td width="140">
          <v-select :items="dates" v-model="from" label="From" outlined dense hide-details />
        </td>
        <td width="140">
          <v-select :items="dates.filter(item => item > from)" v-model="to" label="To" outlined dense hide-details />
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
  name: 'DiagramDynamicMRR',

  components: {
    GChart
  },

  props: ['title', 'dynamic'],

  data: () => ({
    ready: false,
    from: undefined,
    to: undefined,
    collection: null,
    dates: [],
    diagramData: [
      ['Year-Month', '']
    ],

    chartOptions: {
      backgroundColor: '#fbfbfb',
      legend: { position: 'none' },
      colors: ['#900'],
      chart: {
        title: 'MRR',
        height: 300
      },
      vAxis: {
        minValue: 0
      }
    }
  }),

  computed: {
    filteredItems () {
      if (!this.from || !this.to || this.from > this.to) return this.diagramData

      const array = this.diagramData.filter(item => item[0] <= this.to && item[0] >= this.from)
      array.unshift(['Year-Month', this.title])

      return array
    }
  },

  watch: {
    collectionName (val) {
      this.ready = false
      this.getCollection(val)
    }
  },

  methods: {
    getCollection () {
      this.diagramData = [
        ['Year-Month', this.title]
      ]

      this.dates = Object.keys(this.dynamic).sort()
      this.from = this.dates.slice(-8)[0]
      this.to = this.dates.slice(-1)[0]

      for (const date of this.dates) {
        this.diagramData.push([date, this.dynamic[date] || 0])
      }

      this.ready = true
    }
  },

  mounted () {
    this.chartOptions.title = this.title
    // this.chartOptions.vAxis.maxValue = Math.max(...Object.keys(this.dynamic).map(key => this.dynamic[key])) * 1.1
    this.getCollection()
  }
}
</script>
