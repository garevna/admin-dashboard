<template>
  <v-card dark flat class="transparent mx-auto" width="480" height="840">
    <v-expansion-panels
      v-model="panel"
      :readonly="true"
      multiple
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
              <td width="400">
                <v-icon>{{ active[index] ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}</v-icon>
                <b>{{ title }}</b>
              </td>
              <td width="80" style="text-align: right">
                <b>{{ titleValues[index] }}</b>
              </td>
            </tr>
          </table>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="100%">
            <tr
              v-for="(subtitle, num) of subtitles[index]"
              :key="num" @click.stop="subtitleClickHandler(index, num)"
            >
              <td>
                <v-icon small class="ml-5">mdi-file-outline</v-icon>
                {{ subtitle }}
              </td>
              <td style="text-align: right">
                <span style="color: #aefa">{{ subtitleValues[index][num] }}</span>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  name: 'OverviewDash',

  props: ['overviewData', 'clicked'],

  data: () => ({
    panel: [0, 1, 2, 3],
    active: [false, false, false, false, false, false],
    titles: [
      'MRR last month',
      'MRR current month',
      'Pending MRR current month',
      'Total connections',
      'Total on-net buildings',
      'Total premises passed',
      'ARPU',
      'Uptake'
    ],
    subtitles: [
      ['MRR residential', 'MRR commercial'],
      ['MRR residential', 'MRR commercial'],
      ['Pending MRR residential', 'Pending MRR commercial'],
      ['New conenctions last month', 'New conenctions current month', 'New pending current month'],
      [],
      [],
      [],
      []
    ],
    titleValues: [],
    subtitleValues: [],
    items: ['MRR-active', 'MRR-active', 'MRR-pending', 'connections', 'buildings', 'premises', 'ARPU', 'Uptake']
  }),

  computed: {
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
      console.log(index, num, this.subtitles[index][num])
    }
  },

  created () {
    const {
      totalOnNetBuildings,
      premisesPassed,
      connections,
      MRR,
      dynamic,
      residentialDynamic,
      commercialDynamic
    } = this.overviewData

    const averagePerCustomer = (MRR.residential + MRR.commercial) / (connections.residential + connections.commercial)

    const dates = Object.keys(dynamic).sort()

    const [lastMonthDate, currentMonthDate] = [dates.slice(-2)[0], dates.slice(-1)[0]]

    this.titleValues = [
      dynamic[lastMonthDate],
      dynamic[currentMonthDate],
      MRR.pending.residential + MRR.pending.commercial,
      connections.active,
      totalOnNetBuildings,
      premisesPassed.total,
      Math.round((averagePerCustomer + Number.EPSILON) * 100) / 100 + ' USD',
      Math.ceil(100 * (connections.active * 100 / (connections.residential + connections.commercial))) / 10000 + ' %'
    ]
    this.subtitleValues = [
      [residentialDynamic[lastMonthDate], commercialDynamic[lastMonthDate]],
      [residentialDynamic[currentMonthDate], commercialDynamic[currentMonthDate]],
      [MRR.pending.residential, MRR.pending.commercial],
      [connections.newLastMonth, connections.newCurrentMonth, connections.pending],
      [],
      []
    ]
  }
}
</script>

<style>
.expansion-panel-active {
  background: #900;
}
</style>
