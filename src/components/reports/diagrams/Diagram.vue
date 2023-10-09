<template>
  <v-sheet height="480" class="transparent mt-8">
    <!-- <h5 class="text-center">
      <small>{{ title }}</small>
    </h5> -->
    <GChart
      v-if="diagramType === 'pie'"
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
      style="height: 300px"
    />

    <GChart
      v-if="diagramType === 'bars'"
      type="BarChart"
      :data="values"
      :options="chartOptions"
      style="width: 100%; height: 400px"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'Diagram',

  components: {
    GChart
  },

  props: ['diagramType', 'title', 'values', 'headers'],

  data: () => ({
    chartData: [
      ['Status', 'Amount'],
      ['Active', 120],
      ['Pending', 50]
    ],
    chartOptions: {
      title: 'MRR',
      backgroundColor: '#fbfbfb',
      colors: ['#900', '#004'],
      color: '#900',
      height: 300,
      bar: { groupWidth: '80%' },
      legend: { position: 'none' },
      hAxis: {
        title: 'MRR',
        minValue: 0
      },
      vAxis: {
        title: 'Year and month'
      }
    }
  }),

  methods: {
    //
  },

  mounted () {
    this.graphPoints = this.values
  }
}
</script>
