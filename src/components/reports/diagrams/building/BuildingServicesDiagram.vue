<template>
  <v-sheet color="transparent" height="480" class="mt-12">
    <h5 style="color: #005">
      <small> {{ partner.name }} </small>
    </h5>
    <table class="mb-8" cellpadding="16" cellspacing="16">
      <tbody>
        <tr>
          <th style="color: #777"><small>Total active services</small></th>
          <td> {{ partner.services.active }} </td>
          <th style="color: #777"><small>New last month</small></th>
          <td> {{ partner.services.newLastMonth }} </td>
          <th style="color: #777"><small>New current month</small></th>
          <td> {{ partner.services.newCurrentMonth }} </td>
          <th style="color: #777"><small>Pending</small></th>
          <td> {{ partner.services.pending }} </td>
        </tr>
      </tbody>
    </table>
    <PieChart
      v-if="partner.services.active"
      :chartData="chartDataActive"
      title="Active services"
    />
  </v-sheet>
</template>

<script>

export default {
  name: 'BuildingServicesDiagram',

  components: {
    PieChart: () => import('@/components/reports/diagrams/PieChart.vue')
  },

  props: ['building'],

  data: () => ({
    chartDataActive: []
  }),

  methods: {
    createChartData () {
      this.chartDataActive = [
        ['Services', 'Amount'],
        ['Active', this.building.services.active],
        ['Pending', this.building.services.pending]
      ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
