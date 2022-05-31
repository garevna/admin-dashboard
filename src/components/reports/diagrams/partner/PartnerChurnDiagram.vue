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
  name: 'PartnerChurnDiagram',

  components: {
    ColumnChart: () => import('@/components/reports/diagrams/ColumnChart.vue')
  },

  props: ['partner'],

  data: () => ({
    open: false,
    items: ['Awaiting suspension', 'Suspended', 'Awaiting cancelation', 'Canceled'],
    churnChartData: []
  }),

  computed: {
    total () {
      return this.partner.awaitingSuspension.total +
        this.partner.suspended.total +
        this.partner.awaitingCancelation.total +
        this.partner.canceled.total
    }
  },

  methods: {
    buildChurnChartData () {
      this.churnChartData = [
        ['Status', 'Number of services', { role: 'style' }],
        ['Awaiting suspension', this.partner.awaitingSuspension.total, '#b87333'],
        ['Suspended', this.partner.suspended.total, 'silver'],
        ['Awaiting cancelation', this.partner.awaitingCancelation.total, '#004'],
        ['Canceled', this.partner.canceled.total, 'color: #900']
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
