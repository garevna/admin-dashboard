<template>
  <v-sheet color="transparent" height="480" class="mt-12">
    <v-toolbar flat class="transparent">
      <v-spacer />
      <v-menu bottom left offset-overflow :nudge-bottom="48">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>

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
      </v-menu>
    </v-toolbar>
    <!-- <h5 class="text-center">
      <small>{{ title }}</small>
    </h5> -->
    <GChart
      type="BarChart"
      :data="chartData"
      :options="options"
      style="height: 480px"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'DiagramLocations',

  components: {
    GChart
  },

  props: ['sourceData'],

  data: () => ({
    items: [
      { text: 'Total on-net buildings', propName: 'totalOnNetBuildings' },
      { text: 'Total premises passed', propName: 'premises' },
      { text: 'Total connections', propName: 'connections.active' },
      { text: 'Total services', propName: 'services.active' }
    ],
    // selected: { text: 'Total on-net buildings', propName: 'totalOnNetBuildings' },
    chart: null,
    // title: '',
    chartData: [
      ['Location', 'Connections']
    ],
    options: {
      title: '',
      height: 480,
      backgroundColor: '#fbfbfb',
      fontSize: '10px',
      chartArea: { left: 160, top: 0, width: '95%', height: '85%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      animation: {
        startup: true,
        duration: 500
      },
      colors: ['#900'],
      hAxis: {
        title: 'connections',
        minValue: 0
      },
      vAxis: {
        title: 'Location',
        textStyle: {
          fontSize: '10px'
        }
      }
    }
  }),

  // watch: {
  //   selected (val) {
  //     console.log(val)
  //   }
  // },

  methods: {
    getSelected (item) {
      console.log(item)
      this.buildDiagramData(item.text, item.propName)
    },

    buildDiagramData (title, propName) {
      this.options.title = title
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
    // this.options.title = 'Locations'
    // this.chartData = [
    //   ['Location', 'Connections', { role: 'style' }]
    // ]
    // for (const location of Object.keys(this.sourceData)) {
    //   this.chartData.push([location, this.sourceData[location].connections.active, '#900'])
    // }

    // this.ready = true
  }
}
</script>
