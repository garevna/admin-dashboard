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
        v-for="(postCode, index) in postCodes"
        :key="postCode"
        @click="showOverviewDetails(postCode)"
      >
        <v-expansion-panel-header hide-actions :class="index === panel ? 'expansion-panel-active' : ''">
          <table width="100%">
            <tr>
              <td width="320">
                <v-icon>{{ index === panel ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}</v-icon>
                <b>{{ postCode }}</b>
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
              @click.stop="optionClickHandler(postCode, num)"
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

// import { roundFloat } from '@/components/reports/helpers'

export default {
  name: 'BuildingsDash',

  props: ['overviewData', 'clicked', 'clickedOption'],

  data: () => ({
    panel: undefined,
    active: [],
    postCodes: [],
    options: ['Premises passed', 'Active connections', 'MRR', 'Total spent', 'RoI', 'Uptake', 'ARPU'],
    optionValues: [],
    suboptions: [],
    suboptionsValues: []
  }),

  watch: {
    panel (val) {
      if (typeof val !== 'number') this.$emit('update:clicked', val)
    }
  },

  methods: {
    showOverviewDetails (postCode, num) {
      this.$emit('update:clicked', postCode)

      const {
        premisesPassed,
        activeCustomers,
        MRR,
        totalSpent,
        ROI,
        uptake,
        ARPU
      } = this.overviewData[postCode]

      this.optionValues = [
        premisesPassed,
        activeCustomers,
        `$${MRR}`,
        `$${totalSpent}`,
        `$${ROI}`,
        `${uptake}%`,
        `$${ARPU}`
      ]
    },

    optionClickHandler (postCode, num) {
      this.$emit('update:clickedOption', num)
    },

    exportToExcel () {
      this.$router.push({ name: 'export-buildings-overview' })
    }
  },

  created () {
    this.postCodes = Object.keys(this.overviewData)
    this.active = this.postCodes.map(postCode => false)
  }
}
</script>

<style>
.expansion-panel-active {
  background: #900;
  color: #eee;
}
</style>
