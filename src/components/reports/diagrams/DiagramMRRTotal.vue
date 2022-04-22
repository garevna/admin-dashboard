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
  name: 'DiagramMRRTotal',

  components: {
    GChart
  },

  props: ['overviewData'],

  data: () => ({
    ready: false,
    from: undefined,
    to: undefined,
    collection: null,
    dates: [],
    diagramData: [
      ['Year-Month', 'Residential', 'Commercial']
    ],

    chartOptions: {
      legend: { position: 'top', maxLines: 3 },
      chart: {
        title: 'MRR',
        height: 300
      }
    }
  }),

  computed: {
    filteredItems () {
      if (!this.from || !this.to || this.from > this.to) return this.diagramData

      const array = this.diagramData.filter(item => item[0] < this.to && item[0] > this.from)
      array.unshift(['Year-Month', 'Residential', 'Commercial'])

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
        ['Year-Month', 'Residential', 'Commercial']
      ]

      const dynamic = this.overviewData.dynamic

      console.log(dynamic)

      this.dates = Array.from(new Set(Object.keys(dynamic))).sort()
      this.from = this.dates.slice(-7)[0]
      this.to = this.dates.slice(-1)[0]

      let result = 0

      for (const date of this.dates) {
        result += dynamic[date] || 0
        this.diagramData.push([date, result])
      }

      this.ready = true
    }
  }
}
</script>
