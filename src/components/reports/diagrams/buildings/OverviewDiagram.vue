<template>
  <v-container class="transparent mt-12">
    <DropDownMenu
      :items="items"
      :selected.sync="selected"
      :index.sync="selectedIndex"
    />

    <BarChart :sourceData="chartData" color="#900" style="position: relative !important" />

  </v-container>
</template>

<script>

export default {
  name: 'OverviewDiagram',

  components: {
    DropDownMenu: () => import('@/components/inputs/DropDownMenu.vue'),
    BarChart: () => import('@/components/reports/diagrams/BarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    showMenuOptions: false,
    items: [
      'Premises passed',
      'Active connections',
      'MRR',
      'Total spent',
      'RoI',
      'Uptake',
      'ARPU'
    ],
    props: [
      'premisesPassed',
      'activeCustomers',
      'MRR',
      'totalSpent',
      'ROI',
      'uptake',
      'ARPU'
    ],
    selected: 'Active connections',
    selectedIndex: 1,
    chartData: [['Post code', 'Active connections']]
  }),

  watch: {
    selectedIndex (val) {
      if (val === -1) return
      const data = Object.keys(this.sourceData)
        .map(postCode => [postCode, this.sourceData[postCode][this.props[this.selectedIndex]]])

      this.chartData = [['Post code', this.selected], ...data]
    }
  },

  beforeMount () {
    const data = Object.keys(this.sourceData)
      .map(postCode => [postCode, this.sourceData[postCode][this.props[this.selectedIndex]]])

    this.chartData = [['Post code', this.selected], ...data]
  }
}
</script>
