<template>
  <v-sheet color="transparent" height="480" class="mt-8">
    <h5 class="text-center">
      <small>{{ title }}</small>
    </h5>
    <GChart
      v-if="diagramType === 'areas'"
      type="AreaChart"
      :data="values"
      :options="areaChartOptions"
      style="height: 300px"
    />

    <GChart
      v-if="diagramType === 'bars'"
      type="BarChart"
      :data="values"
      :options="barChartOptions"
      style="width: 100%; height: 400px"
    />

    <GChart
      v-if="diagramType === 'columns'"
      type="ColumnChart"
      :data="values"
      :options="columnChartOptions"
      style="height: 300px"
    />
    <!-- <v-sparkline
      fill
      :gradient="['#9007']"
      :value="values"
      color="primary"
      height="160"
      padding="24"
      smooth
      auto-draw
      class="mt-12"
    >
      <template v-slot:label="item">
        ${{ item.value }}
      </template>
    </v-sparkline> -->
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
    areaChartData: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    // barsChartData: [
    //   ['Element', 'Density', { role: 'style' }],
    //   ['Copper', 8.94, '#fa0'],
    //   ['Silver', 10.49, '#09b'],
    //   ['Gold', 19.30, '#f50'],
    //   ['Platinum', 21.45, 'color: #e5e4e2']
    // ],
    barsChartData: [
      ['City', '2010 Population', '2000 Population'],
      ['New York City, NY', 8175000, 8008000],
      ['Los Angeles, CA', 3792000, 3694000],
      ['Chicago, IL', 2695000, 2896000],
      ['Houston, TX', 2099000, 1953000],
      ['Philadelphia, PA', 1526000, 1517000]
    ],
    columnCharData: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    areaChartOptions: {
      chart: {
        title: 'DGtek reports',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        height: 300
      }
    },
    barChartOptions: {
      title: '',
      height: 300,
      bar: { groupWidth: '80%' },
      legend: { position: 'none' },
      hAxis: {
        title: 'MRR(+)',
        minValue: 0
      },
      vAxis: {
        title: 'Year and month'
      }
    },
    columnChartOptions: {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017'
      },
      height: 300,
      bars: 'vertical',
      vAxis: { format: 'decimal' },
      colors: ['#fa0', '#09b', '#f50']
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
