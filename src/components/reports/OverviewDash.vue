<template>
  <v-card dark flat class="transparent mx-auto" width="520">
    <v-btn small color="#ff9" text @click="exportToExcel">
      Export
      <v-icon small class="ml-4">mdi-table-large</v-icon>
    </v-btn>
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
                <b v-html="titleValues[index] || ''" />
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
                <b style="color: #aefa" v-html="subtitleValues[index][num] || ''">
                </b>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

import { roundFloat, getARPU, getUptake } from '@/components/reports/helpers'

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
      const { MRR } = this.overviewData
      const { lastMonth, currentMonth } = MRR

      return {
        total: {
          currentMonth: roundFloat(currentMonth.residential + currentMonth.commercial),
          lastMonth: roundFloat(lastMonth.residential + lastMonth.commercial)
        },
        residential: {
          currentMonth: currentMonth.residential,
          lastMonth: lastMonth.residential
        },
        commercial: {
          currentMonth: currentMonth.commercial,
          lastMonth: lastMonth.commercial
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
    },

    exportToExcel () {
      this.$router.push({ name: 'export-reports-overview' })
      // const route = this.$router.resolve({ path: '/export-reports-overview' })
      // window.open(route.href)
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

    const dates = Object.keys(dynamic).sort()

    const [lastMonthDate, currentMonthDate] = [dates.slice(-2, -1), dates.slice(-1)]

    this.titleValues = [
      `$ ${dynamic[lastMonthDate]} <span class="chip-value">+$ ${this.increaseMRR.total.lastMonth}</span>`,
      `$ ${dynamic[currentMonthDate]} <span class="chip-value">+$ ${this.increaseMRR.total.currentMonth}</span>`,
      `$ ${roundFloat(MRR.pending.residential + MRR.pending.commercial)}`,
      connections.active,
      totalOnNetBuildings,
      premisesPassed.total,
      totalARPU,
      totalUptake
    ]
    this.subtitleValues = [
      [
        `$ ${residentialDynamic[lastMonthDate]} <span class="chip-subvalue">+$ ${this.increaseMRR.residential.lastMonth}</span>`,
        `$ ${commercialDynamic[lastMonthDate]} <span class="chip-subvalue">+$ ${this.increaseMRR.commercial.lastMonth}</span>`
      ],
      [
        `$ ${residentialDynamic[currentMonthDate]} <span class="chip-subvalue">+$ ${this.increaseMRR.residential.currentMonth}</span>`,
        `$ ${commercialDynamic[currentMonthDate]} <span class="chip-subvalue">+$ ${this.increaseMRR.commercial.currentMonth}</span>`
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

.chip-value, .chip-subvalue {
  margin-left: 4px;
  border: solid 1px #fff;
  padding: 4px;
  border-radius: 4px;
  color: #fff;
  white-space: nowrap;
}

.chip-value {
  background: #900;
}

.chip-subvalue {
  background: #09b;
}

</style>

<style scoped>
td {
  padding: 4px 0;
}

</style>
