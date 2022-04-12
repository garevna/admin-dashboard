<template>
  <v-row justify="start">
    <v-col cols="3" v-for="(item, index) of topOfPageItems" :key="index">
      <v-card
        max-width="240"
        height="80"
        class="pa-4"
      >
        <table>
          <tbody>
            <tr style="height: 100%; vertical-align: middle">
              <td width="180" class="pr-2" style="border-right: solid 1px #999"> {{ item.title }}</td>
              <td class="px-2">
                <b style="font-size: 24px">{{ item.value }}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { topOfPageItems } from '@/components/reports/configs'

export default {
  name: 'TopOfPage',

  props: ['overviewData'],

  data: () => ({
    topOfPageItems
  }),

  beforeMount () {
    const { premisesPassed, customers, connections, MRR, totalOnNetBuildings } = this.overviewData

    const totalMRR = MRR.currentMonth.residential + MRR.currentMonth.commercial

    const values = [
      premisesPassed.total,
      customers.residential,
      connections.newCurrentMonth,
      totalMRR,
      totalOnNetBuildings,
      customers.commercial,
      totalMRR - (MRR.lastMonth.residential + MRR.lastMonth.commercial)
    ]

    this.topOfPageItems = topOfPageItems.map((item, index) => Object.assign(item, { value: values[index] }))
  }
}

</script>
