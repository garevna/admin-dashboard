<template>
  <v-container class="transparent">
    <table cellpadding="16" cellspacing="16">
      <thead>
        <tr>
          <th v-for="item of items" :key="item">
            <small>{{ item }}</small>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center">{{ awaitingSuspension }}</td>
          <td style="text-align: center">{{ suspended }}</td>
          <td style="text-align: center">{{ awaitingCancelation }}</td>
          <td style="text-align: center">{{ canceled }}</td>
        </tr>
      </tbody>
    </table>

    <StackedBarChart
      :sourceData="churnChartData"
    />
  </v-container>
</template>

<script>

export default {
  name: 'OverviewROIDiagram',

  components: {
    // BarChart: () => import('@/components/reports/diagrams/BarChart.vue'),
    StackedBarChart: () => import('@/components/reports/diagrams/StackedBarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    items: ['Awaiting suspension', 'Suspended', 'Awaiting cancelation', 'Canceled'],
    awaitingSuspension: 0,
    suspended: 0,
    awaitingCancelation: 0,
    canceled: 0,
    churnChartData: []
  }),

  methods: {
    buildTableData () {
      const [awaitingSuspension, suspended, awaitingCancelation, canceled] = [
        this.sourceData.map(record => record.awaitingSuspension.total),
        this.sourceData.map(record => record.suspended.total),
        this.sourceData.map(record => record.awaitingCancelation.total),
        this.sourceData.map(record => record.canceled.total)
      ]
      this.awaitingSuspension = awaitingSuspension.reduce((res, item) => res + item, 0)
      this.suspended = suspended.reduce((res, item) => res + item, 0)
      this.awaitingCancelation = awaitingCancelation.reduce((res, item) => res + item, 0)
      this.canceled = canceled.reduce((res, item) => res + item, 0)
    },

    buildChurnChartData () {
      this.churnChartData = [
        ['Building'].concat(this.items)
      ]
      for (const record of this.sourceData) {
        this.churnChartData.push([
          record.name,
          record.awaitingSuspension.total,
          record.suspended.total,
          record.awaitingCancelation.total,
          record.canceled.total
        ])
      }
    }
  },

  beforeMount () {
    this.buildTableData()
    this.buildChurnChartData()
  }
}
</script>

<style>
.this-component-menu {
  margin-top: 200px !important;
  z-index: 100;
}
</style>
