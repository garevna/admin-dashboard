<template>
  <v-card dark flat class="transparent mx-auto" width="480">
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

  props: ['partnersData', 'clickedPartner', 'clickedOption'],

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
      if (this.active[index]) {
        this.active[index] = false
        this.$emit('update:clickedPartner', undefined)
        return
      }
      this.$emit('update:clickedPartner', index)
      this.active = this.partnersData.map(item => false)
      this.active[index] = true
      this.clickedItem = this.partners[index]
      // console.log(this.partnersData[index])
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
      this.$emit('update:clickedOption', num)
    },

    exportToExcel () {
      this.$router.push({ name: 'export-partners-overview' })
      // const route = this.$router.resolve({ path: '/export-reports-overview' })
      // window.open(route.href)
    }
  },

  created () {
    this.active = this.partnersData.map(item => false)
    this.partners = this.partnersData.map(partner => partner.name)
  }
}
</script>

<style>
.expansion-panel-active {
  background: #900;
}
</style>
