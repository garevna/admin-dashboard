<template>
  <v-container class="transparent mt-12">
    <DropDownMenu
      :items="items"
      :selected.sync="selected"
    />

    <PartnersConnectionsDiagram
      v-if="selected === 'Connections'"
      :sourceData="sourceData"
    />

    <PartnersServicesDiagram
      v-if="selected === 'Services'"
      :sourceData="sourceData"
    />

    <PartnersChurnDiagram
      v-if="selected === 'Churn'"
      :sourceData="sourceData"
      title="Churn"
    />

    <PartnersMRRDiagram
      v-if="selected === 'MRR'"
      :sourceData="sourceData"
      title="MRR"
    />

  </v-container>
</template>

<script>

export default {
  name: 'PartnersOverviewDiagram',

  components: {
    DropDownMenu: () => import('@/components/inputs/DropDownMenu.vue'),
    PartnersConnectionsDiagram: () => import('@/components/reports/diagrams/partners/PartnersConnectionsDiagram.vue'),
    PartnersServicesDiagram: () => import('@/components/reports/diagrams/partners/PartnersServicesDiagram.vue'),
    PartnersChurnDiagram: () => import('@/components/reports/diagrams/partners/PartnersChurnDiagram.vue'),
    PartnersMRRDiagram: () => import('@/components/reports/diagrams/partners/PartnersMRRDiagram.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    items: [
      'Connections',
      'Services',
      'MRR',
      'Churn'
    ],
    selected: 'Connections',
    chart: null,
    chartData: [
      ['Partner', 'Connections']
    ],
    connectionsChartData: [
      ['Partner', 'Active', 'Pending']
    ]
  })
}
</script>

<style>
.this-component-menu {
  margin-top: 200px !important;
  z-index: 100;
}
</style>
