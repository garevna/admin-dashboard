<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="1200">
    <v-tabs
      v-model="tab"
      dark
      background-color="primary"
    >
      <v-tab> Week </v-tab>
      <v-tab> Table </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="transparent" style="min-height: 480px">
      <v-tab-item>
        <v-card flat class="transparent">
          <WeekSelector :scheduleData="weeks" />
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat class="transparent mt-5">
          <v-row justify="end">
            <v-btn text @click="refresh" class="mr-12 mb-5">
              <v-icon>mdi-refresh</v-icon>
              Refresh
            </v-btn>
          </v-row>

          <v-expansion-panels v-if="ready" v-model="panels" multiple>
            <ScheduleWeek
              v-for="weekNumber of Object.keys(weeks).reverse()"
              :key="weekNumber"
              :weekNumber="weekNumber"
              :weekData.sync=weeks[weekNumber]
            />
          </v-expansion-panels>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>

export default {
  name: 'InstallationSchedule',

  components: {
    WeekSelector: () => import('@/components/schedule/WeekSelector.vue'),
    ScheduleWeek: () => import('@/components/schedule/ScheduleWeek.vue')
  },

  data: () => ({
    tab: 1,
    ready: false,
    records: null,
    weeks: {},
    panels: []
  }),

  methods: {
    createEmptyWeekSchedule (weekNumber) {
      const emptyDate = { am: [], pm: [], afterhours: [] }
      const weekDates = this.getWeekDatesByWeekNumber(weekNumber)
      return Object.assign({}, ...weekDates.map(date => ({ [date]: emptyDate })))
    },

    getScheduleData (data) {
      const weeks = [3, 2, 1, 0].map(num => this.getWeekNumber(new Date()) + num)
      for (const week of weeks) {
        if (!Object.keys(data).includes(week.toString())) Object.assign(data, { [week]: this.createEmptyWeekSchedule(week) })
      }

      this.weeks = data
      this.panels = Object.keys(data).map((item, index) => index)
      this.ready = true
    },

    findLotIndex (customerId, serviceId, lot) {
      const weekNumber = this.getWeekNumber(lot.date)
      const records = this.weeks[weekNumber][lot.date][lot.period]

      return [weekNumber, records.findIndex(record => record.customerId === customerId && record.serviceId === serviceId)]
    },

    moveRecordToJobQueue (data) {
      const { customerId, serviceId, lots, installation } = data

      lots.forEach((lot) => {
        const [weekNumber, index] = this.findLotIndex(customerId, serviceId, lot)
        if (lot.date === installation.date) this.weeks[weekNumber][lot.date][lot.period][index].status = 'In job queue'
        else this.weeks[weekNumber][lot.date][lot.period].splice(index, 1)
      })
    },

    removeRecordsFromSchedule (data) {
      const { customerId, serviceId } = data

      for (const weekNumber of Object.keys(this.weeks)) {
        for (const date of Object.keys(this.weeks[weekNumber])) {
          for (const period of Object.keys(this.weeks[weekNumber][date])) {
            const index = this.weeks[weekNumber][date][period].findIndex(item => item.customerId === customerId && item.serviceId === serviceId)
            if (index !== -1) this.weeks[weekNumber][date][period].splice(index, 1)
          }
        }
      }
    },

    activateRecord (data) {
      this.removeRecordsFromSchedule(data)
    },

    refresh () {
      this.__refreshSchedule(this.scheduleRefreshed)
    },

    scheduleRefreshed (data) {
      this.getScheduleData(data.schedule)
    },

    getUpdates (data) {
      if (data.length) this.refresh()
    }
  },

  beforeMount () {
    this.__getScheduleWeekData(this.weekNumber, this.getScheduleData)

    this.$root.$on('service-activated', this.scheduleRefreshed)
    this.$root.$on('move-record-to-job-queue', this.moveRecordToJobQueue)
    this.$root.$on('activate-record', this.activateRecord)
    this.$root.$on('reject-record', this.removeRecordsFromSchedule)
  },

  beforeDestroy () {
    this.$root.$off('customers-updates-received', this.getUpdates)

    this.$root.$off('service-activated', this.scheduleRefreshed)
    this.$root.$off('move-record-to-job-queue', this.moveRecordToJobQueue)
    this.$root.$off('activate-record', this.activateRecord)
    this.$root.$off('reject-record', this.removeRecordsFromSchedule)
  },

  mounted () {
    this.$root.$on('customers-updates-received', this.getUpdates)
    this.$vuetify.goTo(0)
  }
}
</script>
