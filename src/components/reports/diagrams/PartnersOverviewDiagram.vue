<template>
  <v-container class="transparent mt-12">
    <v-system-bar color="#eee">
      <strong>{{ chartData[0][1] }}</strong>
      <v-spacer></v-spacer>
      <v-btn icon v-if="!open" @click="open = !open">
        <v-icon> mdi-dots-vertical </v-icon>
      </v-btn>
      <div class="this-component-menu" v-if="open">
        <v-list dense>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="getSelected(item)"
            style="cursor: pointer;"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-system-bar>

    <BarChart
      :sourceData="chartData"
    />
  </v-container>
</template>

<script>

export default {
  name: 'PartnersOverviewDiagram',

  components: {
    BarChart: () => import('@/components/reports/diagrams/BarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    items: [
      { text: 'Total connections', propName: 'connections.active' },
      { text: 'Total services', propName: 'services.active' },
      { text: 'MRR total', propName: 'MRR.total' },
      { text: 'MRR residential', propName: 'MRR.residential' },
      { text: 'MRR commercial', propName: 'MRR.commercial' },
      { text: 'Churn', propName: 'churn' }
    ],
    chart: null,
    chartData: [
      ['Partner', 'Connections']
    ]
  }),

  methods: {
    getSelected (item) {
      this.open = false
      this.buildDiagramData(item.text, item.propName)
    },

    buildDiagramData (title, propName) {
      for (const record of this.sourceData) {
        const { residential, commercial } = record.MRR
        Object.assign(record.MRR, { total: residential + commercial })
      }

      this.chartData = [
        ['Partner', title]
      ]

      const props = propName.split('.')

      for (const record of this.sourceData) {
        if (props.length > 1) this.chartData.push([record.name, record[props[0]][props[1]]])
        else this.chartData.push([record.name, record[props[0]]])
      }
    }
  },

  beforeMount () {
    this.buildDiagramData(this.items[0].text, this.items[0].propName)
  }
}
</script>

<style>
.this-component-menu {
  margin-top: 200px !important;
  z-index: 100;
}
</style>
