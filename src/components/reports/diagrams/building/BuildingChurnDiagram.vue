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
          <td style="text-align: center">{{ partner.awaitingSuspension.total }}</td>
          <td style="text-align: center">{{ partner.suspended.total }}</td>
          <td style="text-align: center">{{ partner.awaitingCancelation.total }}</td>
          <td style="text-align: center">{{ partner.canceled.total }}</td>
        </tr>
      </tbody>
    </table>

    <ColumnChart
      v-if="total"
      :sourceData="churnChartData"
      title="Churn"
    />
  </v-container>
</template>

<script>

export default {
  name: 'BuildingChurnDiagram',

  components: {
    ColumnChart: () => import('@/components/reports/diagrams/ColumnChart.vue')
  },

  props: ['building'],

  data: () => ({
    open: false,
    items: ['Awaiting suspension', 'Suspended', 'Awaiting cancelation', 'Canceled'],
    churnChartData: []
  }),

  computed: {
    total () {
      return this.building.awaitingSuspension.total +
        this.building.suspended.total +
        this.building.awaitingCancelation.total +
        this.building.canceled.total
    }
  },

  methods: {
    buildChurnChartData () {
      this.churnChartData = [
        ['Status', 'Number of services', { role: 'style' }],
        ['Awaiting suspension', this.building.awaitingSuspension.total, '#b87333'],
        ['Suspended', this.building.suspended.total, 'silver'],
        ['Awaiting cancelation', this.building.awaitingCancelation.total, '#004'],
        ['Canceled', this.building.canceled.total, 'color: #900']
      ]

      // [
      //   ['Status', 'Services'],
      //   [this.items[0], this.partner.awaitingSuspension.total],
      //   [this.items[1], this.partner.suspended.total],
      //   [this.items[2], this.partner.awaitingCancelation.total],
      //   [this.items[3], this.partner.canceled.total]
      // ]
    }
  },

  beforeMount () {
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
