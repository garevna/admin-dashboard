<template>
  <v-container class="transparent mt-12">
    <v-row justify="end" class="mb-4">
      <v-btn icon @click="open = !open">
        <v-icon> mdi-dots-vertical </v-icon>
      </v-btn>

      <div class="my-menu v-menu__content" v-if="open" style="z-index: 100">
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
    </v-row>

    <GChart
      type="BarChart"
      :data="chartData"
      :options="options"
      :style="{ height: diagramHeight + 'px' }"
    />
  </v-container>
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
      ['Location', 'Connections']
    ],
    options: {
      title: '',
      height: 480,
      // isStacked: 'absolute',

      backgroundColor: '#fbfbfb',
      fontSize: '10px',
      chartArea: { left: 160, top: 0, width: '95%' },
      legend: { position: 'none' },
      animation: {
        startup: true,
        duration: 500
      },
      colors: ['#900'],
      hAxis: {
        title: 'Connections',
        textStyle: {
          fontSize: 10,
          fontName: 'Gilroy'
        },
        titleTextStyle: {
          fontSize: 11,
          bold: true,
          fontName: 'Gilroy'
        },
        minValue: 0
      },
      vAxis: {
        title: 'Location',
        viewWindowMode: 'maximized',
        textStyle: {
          fontSize: 10,
          fontName: 'Gilroy'
        },
        titleTextStyle: {
          fontSize: 11,
          bold: true,
          fontName: 'Gilroy'
        }
      }
    }
  }),

  computed: {
    diagramHeight () {
      return this.sourceData.length * 24
    }
  },

  methods: {
    getSelected (item) {
      this.open = false
      this.buildDiagramData(item.text, item.propName)
    },

    buildDiagramData (title, propName) {
      this.options.hAxis.title = title
      this.chartData = [
        ['Location', title]
      ]

      const props = propName.split('.')

      for (const location of Object.keys(this.sourceData)) {
        if (props.length > 1) this.chartData.push([location, this.sourceData[location][props[0]][props[1]]])
        else this.chartData.push([location, this.sourceData[location][props[0]]])
      }

      this.options.height = Object.keys(this.sourceData).length * 24
    }
  },

  beforeMount () {
    this.buildDiagramData(this.items[0].text, this.items[0].propName)
  }
}
</script>

<style>
/* .my-menu .v-menu__content {
  top: 540px !important;
  right: 48px !important;
  z-index: 100;
} */
</style>
