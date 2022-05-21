<template>
  <v-card dark flat class="transparent mx-auto" width="480">
    <v-expansion-panels
      v-model="panel"
    >
      <v-expansion-panel
        flat
        class="transparent"
        v-for="(title, index) of titles"
        :key="index"
        @click="titleClickHandler(index)"
      >
        <v-expansion-panel-header hide-actions :class="active[index] ? 'expansion-panel-active' : ''">
          <table width="100%">
            <tr>
              <td width="320">
                <v-icon>{{ active[index] ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}</v-icon>
                <b>{{ title }}</b>
              </td>
              <td width="160" style="text-align: right">
                <b>{{ titleValues[index] || '' }}</b>
              </td>
            </tr>
          </table>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="100%">
            <tr
              v-for="(subtitle, num) of subtitles[index]"
              :key="num"
              @click.stop="subtitleClickHandler(index, num)"
              style="cursor: pointer;"
            >
              <td>
                <v-icon small class="ml-5">mdi-file-outline</v-icon>
                {{ subtitle }}
              </td>
              <td style="text-align: right">
                <span style="color: #aefa">
                  {{ subtitleValues[index][num] || '' }}
                </span>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

import { getARPU, getUptake } from '@/components/reports/helpers'
import {
  overviewTitles,
  overviewSubtitles,
  overviewItems,
  overviewSubitems
} from '@/components/reports/configs'

export default {
  name: 'OverviewDash',

  props: ['overviewData', 'clicked'],

  data: () => ({
    panel: [],
    active: [false, false, false, false, false, false, false, false, false, false, false],
    titles: overviewTitles,
    subtitles: overviewSubtitles,
    titleValues: [],
    subtitleValues: [],
    items: overviewItems,
    subItems: overviewSubitems
  }),

  computed: {
    increaseMRR () {
      const { dynamic, residentialDynamic, commercialDynamic } = this.overviewData
      const dates = Object.keys(dynamic).sort()
      const [current, last, prev] = [dates.pop(), dates.pop(), dates.pop()]
      return {
        total: {
          currentMonth: Math.round((dynamic[current] - dynamic[last]) * 100) / 100,
          lastMonth: Math.round((dynamic[last] - dynamic[prev]) * 100) / 100
        },
        residential: {
          currentMonth: Math.round((residentialDynamic[current] - residentialDynamic[last]) * 100) / 100,
          lastMonth: Math.round((residentialDynamic[last] - residentialDynamic[prev]) * 100) / 100
        },
        commercial: {
          currentMonth: Math.round((commercialDynamic[current] - commercialDynamic[last]) * 100) / 100,
          lastMonth: Math.round((commercialDynamic[last] - commercialDynamic[prev]) * 100) / 100
        }
      }
    },

    clickedItem: {
      get () {
        return this.clicked
      },
      set (val) {
        this.$emit('update:clicked', val)
      }
    }
  },

  methods: {
    titleClickHandler (index) {
      this.active = [false, false, false, false, false, false]
      this.active[index] = true
      this.clickedItem = this.items[index]
    },

    subtitleClickHandler (index, num) {
      this.clickedItem = this.subItems[index][num] ? this.subItems[index][num] : this.items[index]
    }
  },

  created () {
    const {
      totalOnNetBuildings,
      newLeadIngsCurrentMonth,
      premisesPassed,
      connections,
      MRR,
      dynamic,
      residentialDynamic,
      commercialDynamic,
      awaitingSuspension,
      suspended,
      awaitingCancelation,
      canceled
    } = this.overviewData

    const { total: totalARPU, residential: residentialARPU, commercial: commercialARPU } = getARPU(this.overviewData)
    const { total: totalUptake, residential: residentialUptake, commercial: commercialUptake } = getUptake(this.overviewData)

    const dates = Object.keys(dynamic).sort((a, b) => a > b)

    const [lastMonthDate, currentMonthDate] = [dates.slice(1)[0], dates.slice(0)[0]]

    this.titleValues = [
      `$ ${dynamic[lastMonthDate]} (+$ ${this.increaseMRR.total.lastMonth})`,
      `$ ${dynamic[currentMonthDate]} (+$ ${this.increaseMRR.total.currentMonth})`,
      `$ ${MRR.pending.residential + MRR.pending.commercial}`,
      connections.active,
      totalOnNetBuildings,
      premisesPassed.total,
      totalARPU,
      totalUptake
    ]
    this.subtitleValues = [
      [
        `$ ${residentialDynamic[lastMonthDate]} (+$ ${this.increaseMRR.residential.lastMonth})`,
        `$ ${commercialDynamic[lastMonthDate]} (+$ ${this.increaseMRR.commercial.lastMonth})`
      ],
      [
        `$ ${residentialDynamic[currentMonthDate]} (+$ ${this.increaseMRR.residential.currentMonth})`,
        `$ ${commercialDynamic[currentMonthDate]} (+$ ${this.increaseMRR.commercial.currentMonth})`
      ],
      [`$ ${MRR.pending.residential}`, `$ ${MRR.pending.commercial}`],
      [
        connections.residential,
        connections.commercial,
        connections.newLastMonth,
        connections.newCurrentMonth,
        connections.pendingCommercial + connections.pendingResidential,
        connections.pending
      ],
      [newLeadIngsCurrentMonth],
      [
        premisesPassed.residential,
        premisesPassed.commercial,
        premisesPassed.mixed
      ],
      [residentialARPU, commercialARPU],
      [residentialUptake, commercialUptake],
      [awaitingSuspension.total, suspended.total, awaitingCancelation.total, canceled.total],
      [awaitingSuspension.lastMonth, suspended.lastMonth, awaitingCancelation.lastMonth, canceled.lastMonth],
      [awaitingSuspension.currentMonth, suspended.currentMonth, awaitingCancelation.currentMonth, canceled.currentMonth]
    ]
  }
}
</script>

<style>
.expansion-panel-active {
  background: #900;
}
</style>
