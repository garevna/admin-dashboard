<template>
  <v-sheet color="transparent" height="480" class="mt-12">
    <h5 style="color: #005">
      <small> {{ partner.name }} </small>
    </h5>
    <table class="mb-8" cellpadding="16" cellspacing="16">
      <tbody>
        <tr>
          <th style="color: #777"><small>Total active connections</small></th>
          <td> {{ partner.connections.active }} </td>
          <th style="color: #777"><small>Residential</small></th>
          <td> {{ partner.connections.residential }} </td>
          <th style="color: #777"><small>Commercial</small></th>
          <td> {{ partner.connections.commercial }} </td>
        </tr>
        <tr>
          <th style="color: #777"><small>New connections</small></th>
          <td></td>
          <th style="color: #777"><small>Last month</small></th>
          <td> {{ partner.connections.newLastMonth }} </td>
          <th style="color: #777"><small>Current month</small></th>
          <td> {{ partner.connections.newCurrentMonth }} </td>
        </tr>
        <tr>
          <th style="color: #777"><small>Total pending connections</small></th>
          <td> {{ partner.connections.pendingResidential + partner.connections.pendingCommercial }} </td>
          <th style="color: #777"><small>Residential</small></th>
          <td> {{ partner.connections.pendingResidential }} </td>
          <th style="color: #777"><small>Commercial</small></th>
          <td> {{ partner.connections.pendingCommercial }} </td>
        </tr>
      </tbody>
    </table>
    <PieChart
      v-if="partner.connections.active"
      :chartData="chartDataActive"
      title="Active connections"
    />
    <PieChart
      v-if="partner.connections.pendingResidential || partner.connections.pendingCommercial"
      :chartData="chartDataPending"
      title="Pending Connections"
    />
  </v-sheet>
</template>

<script>

export default {
  name: 'BuildingConnectionsDiagram',

  components: {
    PieChart: () => import('@/components/reports/diagrams/PieChart.vue')
  },

  props: ['building'],

  data: () => ({
    chartDataActive: [],
    chartDataPending: []
  }),

  methods: {
    createChartData () {
      this.chartDataActive = [
        ['Active connections', 'Amount'],
        ['Residential', this.building.connections.residential],
        ['Commercial', this.building.connections.commercial]
      ]
      this.chartDataPending = [
        ['Pending connections', 'Amount'],
        ['Residential', this.building.connections.pendingResidential],
        ['Commercial', this.building.connections.pendingCommercial]
      ]
    }
  },

  mounted () {
    this.createChartData()
  }
}
</script>
