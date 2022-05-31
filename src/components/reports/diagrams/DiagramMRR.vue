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
      v-if="ready"
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
  name: 'DiagramMRR',

  components: {
    GChart
  },

  props: ['overviewData'],

  data: () => ({
    ready: false,
    from: undefined,
    to: undefined,
    dates: [],
    diagramData: [
      ['Year-Month', 'Residential', 'Commercial']
    ],

    chartOptions: {
      backgroundColor: '#fbfbfb',
      legend: { position: 'top', maxLines: 3 },
      colors: ['#900', '#004'],
      chart: {
        title: 'MRR',
        subtitle: 'Residential / commercial',
        height: 300
      },
      hAxis: { title: 'Year-month', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 }
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

  methods: {
    getCollection () {
      this.dates = Object.keys(this.overviewData.dynamic).sort()

      const [residential, commercial] = [this.overviewData.residentialDynamic, this.overviewData.commercialDynamic]

      this.from = this.dates.slice(-7)[0]
      this.to = this.dates.slice(-1)[0]

      for (const date of this.dates) {
        this.diagramData.push([date, residential[date], commercial[date]])
      }

      this.ready = true
    }
  },

  mounted () {
    this.getCollection()
  }
}
</script>
