<template>
  <v-card flat class="transparent mx-auto" max-width="1080">
    <v-row justify="start">
      <v-col cols="3" v-for="(item, index) of mainMenuItems" :key="index">
        <v-card
          max-width="240"
          height="80"
          class="pa-4"
        >
          <table>
            <tbody>
              <tr style="height: 100%; vertical-align: middle">
                <td width="180" style="border-right: solid 1px #999"> {{ item.title }}</td>
                <td class="px-2">
                  <b style="font-size: 24px">{{ item.value }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-12">
      <v-btn
        :dark="active[0]"
        :class="active[0] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(0)"
      >
        <Overview style="position: absolute; left: -12px" />
        <b class="ml-8"> Overview </b>
      </v-btn>

      <v-btn
        :dark="active[1]"
        :class="active[1] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(1)"
      >
        <Financials style="position: absolute; left: -12px" />
        <b class="ml-8"> Financials </b>
      </v-btn>

      <v-btn
        :dark="active[2]"
        :class="active[2] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(2)"
      >
        <Buildings style="position: absolute; left: -12px" />
        <b class="ml-8"> Buildings </b>
      </v-btn>

      <v-btn
        :dark="active[3]"
        :class="active[3] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(3)"
      >
        <ARPU style="position: absolute; left: -12px" />
        <b class="ml-8"> ARPU </b>
      </v-btn>
      <v-btn
        :dark="active[4]"
        :class="active[4] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
        height="64"
        width="160"
        @click="setActive(4)"
      >
        <Forecast style="position: absolute; left: -12px" />
        <b class="ml-8"> Forecast </b>
      </v-btn>
    </v-row>

    <v-row class="mb-12">
      <v-col cols="6">
        <v-card dark class="mt-12 pa-8 dark-blue" height="480">
          Lorem ipsum...
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-sheet color="transparent">
          <v-sparkline
            fill
            :gradient="['#9007']"
            :value="graphPoints"
            color="primary"
            height="160"
            padding="24"
            smooth
            auto-draw
            class="mt-12"
          >
            <template v-slot:label="item">
              ${{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
        <!-- <v-sparkline
          fill
          :gradient="['#09b']"
          :line-width="1"
          :padding="0"
          :smooth="10"
          :value="graphPoints"
          auto-draw
          class="mt-12"
        /> -->
      </v-col>
    </v-row>
  </v-card>

</template>

<script>

import Overview from '@/components/icons/Overview.vue'
import Financials from '@/components/icons/Financials.vue'
import Forecast from '@/components/icons/Forecast.vue'
import ARPU from '@/components/icons/ARPU.vue'
import Buildings from '@/components/icons/Buildings.vue'

export default {
  name: 'MainReportPage',

  components: {
    Overview,
    Financials,
    Forecast,
    ARPU,
    Buildings
  },

  data: () => ({
    active: [false, false, true, false, false],
    graphPoints: [210, 420, 510, 575, 589],
    mainMenuItems: [
      {
        title: 'Total premises passed',
        value: 1245
      },
      {
        title: 'Total residential customers',
        value: 1578
      },
      {
        title: 'Current month new connections',
        value: 10
      },
      {
        title: 'Total monthly recuring revenew',
        value: 7854
      },
      {
        title: 'Total on-net buildings',
        value: 5478
      },
      {
        title: 'Total commercial customers',
        value: 574
      },
      {
        title: 'Current month MRC increase',
        value: 1879
      }
    ]
  }),

  methods: {
    setActive (index) {
      this.active = [false, false, false, false, false]
      this.active[index] = true
    },

    calcReport (response) {
      console.log('CREATE:\n', response)
      this.__calculateReports(response => console.log(response))
    }
  },

  created () {
    this.__createReport(this.calcReport)
  }
}
</script>
