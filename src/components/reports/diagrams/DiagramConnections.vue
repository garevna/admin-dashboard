<template>
  <v-sheet color="transparent" height="480" class="mt-8">
    <!-- <table>
      <tbody>
        <tr>
          <td> -->
            <GChart
              type="PieChart"
              :data="statusChartData"
              :options="chartOptions"
              width="320"
            />
          <!-- </td>
          <td> -->
            <GChart
              type="PieChart"
              :data="typeChartData"
              :options="chartOptions"
              width="320"
            />
          <!-- </td>
        </tr>
        <tr> -->
          <!-- <td>
            <GChart
              type="PieChart"
              :data="activeChartData"
              :options="activeChartOptions"
            />
          </td> -->
          <!-- <td> -->
            <GChart
              type="PieChart"
              :data="pendingChartData"
              :options="pendingChartOptions"
            />
          <!-- </td>
        </tr>
      </tbody>
    </table> -->
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'DiagramConnections',

  components: {
    GChart
  },

  props: ['title', 'values', 'headers'],

  data: () => ({
    statusChartData: [],
    typeChartData: [],
    activeChartData: [],
    pendingChartData: [],
    chartOptions: {
      backgroundColor: '#fbfbfb',
      title: 'Connections',
      colors: ['#900', '#004'],
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: 'Connections',
        height: 300
      }
    },
    activeChartOptions: {
      backgroundColor: '#fbfbfb',
      title: 'Active connections',
      colors: ['#900', '#004'],
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: 'Active connections',
        height: 320
      }
    },
    pendingChartOptions: {
      backgroundColor: '#fbfbfb',
      colors: ['#900', '#004'],
      title: 'Pending connections',
      animation: {
        startup: true,
        duration: 500
      },
      chart: {
        title: 'Pending connections',
        height: 320
      }
    }
  }),

  methods: {
    createChartData () {
      this.statusChartData = [
        ['Status', 'Amount'],
        ['Active', this.values.active],
        ['Pending', this.values.pendingResidential + this.values.pendingCommercial]
      ]

      this.typeChartData = [
        ['Status', 'Amount'],
        ['Residential', this.values.residential],
        ['Commercial', this.values.commercial]
      ]

      // this.activeChartData = [
      //   ['Active', 'Amount'],
      //   ['Residential', this.values.residential],
      //   ['Commercial', this.values.pendingCommercial]
      // ]

      this.pendingChartData = [
        ['Pending', 'Amount'],
        ['Residential', this.values.pendingResidential],
        ['Commercial', this.values.pendingCommercial]
      ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
