<template>
  <v-card flat class="transparent">
    <v-toolbar dark flat class="primary">
      <v-btn text small v-for="item of items" :key="item" @click="selected = item">
        {{ item }}
      </v-btn>
    </v-toolbar>

    <StackedBarChart
      v-if="selected === 'Residential / Commercial'"
      :sourceData="typesChartData"
      title="MRR"
    />

    <StackedBarChart
      v-if="selected === 'Active / Pending'"
      :sourceData="statusChartData"
      title="MRR"
    />

    <BarChart
      v-if="selected === 'MRR total'"
      :sourceData="chartData"
      title="MRR"
    />
  </v-card>
</template>

<script>

export default {
  name: 'PartnersMRRDiagram',

  components: {
    BarChart: () => import('@/components/reports/diagrams/BarChart.vue'),
    StackedBarChart: () => import('@/components/reports/diagrams/StackedBarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    items: [
      'MRR total',
      'Residential / Commercial',
      'Active / Pending'
    ],
    selected: 'MRR total',
    chartData: [
      ['Partner', 'MRR total']
    ],
    typesChartData: [
      ['Partner', 'Residential', 'Commercial']
    ],
    statusChartData: [
      ['Partner', 'Active', 'Pending']
    ]
  }),

  methods: {
    getSelected (item) {
      this.open = false
      this.selected = item.text
      this.buildDiagramData(item.text, item.propName)
    },

    buildChartData () {
      this.chartData = [
        ['Partner', 'MRR total']
      ]

      for (const record of this.sourceData) {
        this.chartData.push([record.name, this.__roundFloat(record.MRR.residential + record.MRR.commercial)])
      }

      this.typesChartData = [
        ['Partner', 'Residential', 'Commercial']
      ]
      for (const record of this.sourceData) {
        this.typesChartData.push([record.name, record.MRR.residential, record.MRR.commercial])
      }

      this.statusChartData = [
        ['Partner', 'Active', 'Pending']
      ]
      for (const record of this.sourceData) {
        this.statusChartData.push([
          record.name,
          this.__roundFloat(record.MRR.residential + record.MRR.commercial),
          this.__roundFloat(record.MRR.pending.residential + record.MRR.pending.commercial)
        ])
      }
    }
  },

  beforeMount () {
    this.buildChartData()
  }
}
</script>

<style>
.this-component-menu {
  margin-top: 200px !important;
  z-index: 100;
}
</style>
