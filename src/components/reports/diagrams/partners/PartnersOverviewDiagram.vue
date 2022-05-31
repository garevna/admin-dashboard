<template>
  <v-container class="transparent mt-12">
    <v-toolbar flat color="#004" dark>
      <v-toolbar-title>
        <small><b>{{ selected }}</b></small>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="selected = item"
          >
            <v-list-item-title>
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

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
