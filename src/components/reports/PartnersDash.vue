<template>
  <v-card dark flat class="transparent mx-auto" width="480">
    <v-expansion-panels
      v-model="panel"
    >
      <v-expansion-panel
        flat
        class="transparent"
        v-for="(partner, index) of partners"
        :key="index"
        @click="partnerClickHandler(index)"
      >
        <v-expansion-panel-header hide-actions :class="active[index] ? 'expansion-panel-active' : ''">
          <table width="100%">
            <tr>
              <td width="320">
                <v-icon>{{ active[index] ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}</v-icon>
                <b>{{ partner }}</b>
              </td>
              <td width="160" style="text-align: right">
                <!-- <b>{{ partnerValues[index] || '' }}</b> -->
              </td>
            </tr>
          </table>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="100%">
            <tr
              v-for="(option, num) of options"
              :key="num"
              @click.stop="optionClickHandler(index, num)"
              style="cursor: pointer;"
            >
              <td>
                <v-icon small class="ml-5">mdi-file-outline</v-icon>
                {{ option }}
              </td>
              <td style="text-align: right">
                <span style="color: #aefa">
                  {{ optionValues[num] || '' }}
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

import { roundFloat } from '@/components/reports/helpers'

export default {
  name: 'PartnersDash',

  props: ['partnersData', 'clicked'],

  data: () => ({
    panel: [],
    active: [],
    partners: null,
    options: ['MRR', 'Connections', 'Services', 'Churn'],
    optionValues: [],
    suboptions: [
      ['Residential', 'Commercial', 'Pending', 'Last month', 'Current month'],
      ['Residential', 'Commercial', 'Pending', 'Last month', 'Current month'],
      ['Residential', 'Commercial', 'Pending', 'Last month', 'Current month'],
      ['Awaiting to be suspended', 'Suspended', 'Awaiting to be canceled', 'Canceled']
    ],
    suboptionsValues: []
  }),

  methods: {
    partnerClickHandler (index) {
      console.log(index)
      this.$emit('update:clicked', index)
      this.active = this.partnersData.map(item => false)
      this.active[index] = true
      this.clickedItem = this.partners[index]
      const { MRR, connections, services, awaitingSuspension, suspended, awaitingCancelation, canceled } = this.partnersData[index]
      this.optionValues = [
        roundFloat(MRR.residential + MRR.commercial),
        connections.active,
        services.active,
        suspended.total + canceled.total
      ]

      this.suboptionsValues = [
        [
          MRR.residential,
          MRR.commercial,
          MRR.pending,
          MRR.lastMonth,
          MRR.currentMonth
        ],
        [
          connections.residential,
          connections.commercial,
          connections.pendingResidential + connections.pendingCommercial,
          connections.lastMonth,
          connections.currentMonth
        ],
        [
          services.residential,
          services.commercial,
          services.pending,
          services.newLastMonth,
          services.newCurrentMonth
        ],
        [
          awaitingSuspension.total,
          suspended.total,
          awaitingCancelation.total,
          canceled.total
        ]
      ]
    },

    optionClickHandler (index, num) {
      console.log(index, num)
      // this.clickedItem = this.options[index][num] ? this.options[index][num] : this.items[index]
    }
  },

  created () {
    // const {
    //   totalOnNetBuildings,
    //   newLeadIngsCurrentMonth,
    //   premisesPassed,
    //   connections,
    //   MRR,
    //   dynamic,
    //   residentialDynamic,
    //   commercialDynamic,
    //   awaitingSuspension,
    //   suspended,
    //   awaitingCancelation,
    //   canceled
    // } = this.partnersData
    //
    // const { total: totalARPU, residential: residentialARPU, commercial: commercialARPU } = getARPU(this.overviewData)
    // const { total: totalUptake, residential: residentialUptake, commercial: commercialUptake } = getUptake(this.overviewData)
    //
    // const dates = Object.keys(dynamic).sort((a, b) => a > b)

    // const [lastMonthDate, currentMonthDate] = [dates.slice(1)[0], dates.slice(0)[0]]

    console.log(this.partnersData)

    this.active = this.partnersData.map(item => false)

    this.partners = this.partnersData.map(partner => partner.name)
    // this.subtitleValues = this.titles.map(title => ([]))
    // this.titleValues = this.partnersData.map(partner => partner.company.name)
  }
}
</script>

<style>
.expansion-panel-active {
  background: #900;
}
</style>
