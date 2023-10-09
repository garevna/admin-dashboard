<template>
  <v-container class="transparent">
    <v-system-bar color="#eee">
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

    <!-- <v-row justify="end" style="height: 32px">
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
    </v-row> -->

    <GChart
      type="BubbleChart"
      :data="chartData"
      :options="options"
    />
  </v-container>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'DiagramLocationsBubble',

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
      ['Locality', 'Total on-net buildings', 'Total premises passed', 'MRR'],
      ['CAN', 80.66, 1.67, 33739900],
      ['DEU', 79.84, 1.36, 81902307],
      ['DNK', 78.6, 1.84, 5523095],
      ['EGY', 72.73, 2.78, 79716203],
      ['GBR', 80.05, 2, 61801570],
      ['IRN', 72.49, 1.7, 73137148],
      ['IRQ', 68.09, 4.77, 31090763],
      ['ISR', 81.55, 2.96, 7485600],
      ['RUS', 68.6, 1.54, 141850000],
      ['USA', 78.09, 2.05, 307007000]
    ],
    options: {
      title: 'Locations',
      height: 480,
      bubble: {
        textStyle: {
          fontSize: 10
        }
      },
      backgroundColor: '#fbfbfb',
      legend: { position: 'none' },
      animation: {
        startup: true,
        duration: 500
      },
      colors: ['#900'],
      hAxis: {
        title: 'Total on-net buildings',
        viewWindowMode: 'maximized',
        minValue: -10,
        textStyle: {
          fontSize: 10,
          fontName: 'Gilroy'
        },
        titleTextStyle: {
          fontSize: 10,
          bold: true,
          fontName: 'Gilroy'
        }
      },
      vAxis: {
        title: 'Total premises passed',
        viewWindowMode: 'maximized',
        minValue: -200,
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

    buildDiagramData (header, items) {
      const [titleX, titleY, xPropName, yPropName] = [items[0].text, items[1].text, items[0].propName, items[1].propName]

      this.options.hAxis.title = header
      this.chartData = [
        ['Locality', titleX, titleY, 'Location', 'MRR']
      ]

      const [propsX, propsY] = [xPropName.split('.'), yPropName.split('.')]

      for (const location of Object.keys(this.sourceData)) {
        const row = [location]
        const [valueX, valueY] = [
          propsX.length > 1 ? this.sourceData[location][propsX[0]][propsX[1]] : this.sourceData[location][propsX[0]],
          propsY.length > 1 ? this.sourceData[location][propsY[0]][propsY[1]] : this.sourceData[location][propsY[0]]
        ]
        row.push(valueX, valueY, 'location', this.sourceData[location].MRR)

        this.chartData.push(row)
      }
    }
  },

  beforeMount () {
    this.buildDiagramData('MRR', [this.items[0], this.items[1]])
  }
}
</script>

<style>
.this-component-menu {
  margin-top: 200px !important;
  /* background: #005 !important; */
  /* top: 540px !important;
  right: 48px !important; */
  z-index: 100;
}
</style>
