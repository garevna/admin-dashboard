<template>
  <v-container class="transparent">
    <v-system-bar color="#eee">
      <strong>{{ chartData[0][1] }}</strong>
      <v-spacer></v-spacer>
      <v-btn text v-if="!open" @click="open = !open">
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
  name: 'DiagramLocations',

  components: {
    BarChart: () => import('@/components/reports/diagrams/BarChart.vue')
  },

  props: ['sourceData'],

  data: () => ({
    open: false,
    items: [
      { text: 'Total on-net buildings', propName: 'totalOnNetBuildings' },
      { text: 'Total premises passed', propName: 'premises' },
      { text: 'Total connections', propName: 'connections.active' },
      { text: 'Total services', propName: 'services.active' },
      { text: 'MRR', propName: 'MRR' }
    ],
    chart: null,
    chartData: [
      ['Locality', 'Connections']
    ]
  }),

  methods: {
    getSelected (item) {
      this.open = false
      this.buildDiagramData(item.text, item.propName)
    },

    buildDiagramData (title, propName) {
      this.chartData = [
        ['Location', title]
      ]

      const props = propName.split('.')

      for (const location of Object.keys(this.sourceData)) {
        if (props.length > 1) this.chartData.push([location, this.sourceData[location][props[0]][props[1]]])
        else this.chartData.push([location, this.sourceData[location][props[0]]])
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
