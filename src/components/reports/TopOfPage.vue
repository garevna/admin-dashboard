<template>
  <v-row justify="start">
    <v-col cols="3" v-for="(item, index) of topOfPageItems" :key="index">
      <v-card
        max-width="360"
        height="80"
        class="pa-4"
      >
        <table>
          <tbody>
            <tr style="height: 100%; vertical-align: middle">
              <td width="50%" class="pr-2" style="border-right: solid 1px #999"> {{ item.title }}</td>
              <td class="px-2 text-right">
                <b style="font-size: 20px">{{ item.value }}</b>
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
    const { premisesPassed, connections, MRR, totalOnNetBuildings, dynamic } = this.overviewData

    const dates = Object.keys(dynamic).sort()
    const [current, last] = [dates.pop(), dates.pop()]

    const totalMRR = `$ ${Math.round((MRR.residential + MRR.commercial) * 100) / 100}`

    const currentMonthMRRIncrease = `$ ${Math.round((dynamic[current] - dynamic[last]) * 100) / 100}`

    const values = [
      premisesPassed.total,
      connections.residential,
      connections.newCurrentMonth,
      totalMRR,
      totalOnNetBuildings,
      connections.commercial,
      currentMonthMRRIncrease
    ]

    this.topOfPageItems = topOfPageItems.map((item, index) => Object.assign(item, { value: values[index] }))
  }
}

</script>
