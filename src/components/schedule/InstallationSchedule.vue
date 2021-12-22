<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="1200">
    <v-row justify="end">
      <v-btn text @click="refresh" class="mr-12 mb-5">
        <v-icon>mdi-refresh</v-icon>
        Refresh
      </v-btn>
    </v-row>
    <v-expansion-panels v-if="ready" v-model="panels" multiple>
      <ScheduleWeek
        v-for="weekNumber of Object.keys(weeks)"
        :key="weekNumber"
        :weekNumber="weekNumber"
        :weekData.sync=weeks[weekNumber]
        :changedRecord.sync="changedRecord"
      />
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  name: 'InstallationSchedule',

  components: {
    ScheduleWeek: () => import('@/components/schedule/ScheduleWeek.vue')
  },

  data: () => ({
    ready: false,
    records: null,
    weeks: {},
    panels: [],
    changedRecord: null
  }),

  methods: {
    createEmptyWeekSchedule (weekNumber) {
      const emptyDate = { am: [], pm: [], afterhours: [] }
      const weekDates = this.getWeekDatesByWeekNumber(weekNumber)
      return Object.assign({}, ...weekDates.map(date => ({ [date]: emptyDate })))
    },

    getScheduleData (data) {
      const weeks = [0, 1, 2, 3].map(num => this.getWeekNumber(new Date()) + num)
      for (const week of weeks) {
        if (!Object.keys(data).includes(week.toString())) Object.assign(data, { [week]: this.createEmptyWeekSchedule(week) })
      }

      this.weeks = data
      this.panels = Object.keys(data).map((item, index) => index)
      this.ready = true
    },

    moveRecordToJobQueue (data) {
      const { customerId, serviceId, lots, installation } = data

      lots.forEach((lot) => {
        const weekNumber = this.getWeekNumber(lot.date)
        const records = this.weeks[weekNumber][lot.date][lot.period]
        const index = records.findIndex(record => record.customerId === customerId && record.serviceId === serviceId)
        if (lot.date === installation.date) {
          this.weeks[weekNumber][lot.date][lot.period][index].status = 'In job queue'
        } else {
          this.weeks[weekNumber][lot.date][lot.period].splice(index, 1)
        }
      })
    },

    activateRecord (data) {
      const { week, date, period, customerId, serviceId } = data

      const records = this.weeks[week][date][period]

      const index = records.findIndex(record => record.customerId === customerId && record.serviceId === serviceId)

      if (index !== -1) this.weeks[week][date][period].splice(index, 1)
    },

    refresh () {
      this.ready = false
      this.__refreshSchedule(this.scheduleRefreshed)
    },

    scheduleRefreshed (data) {
      this.getScheduleData(data.schedule)
    }
  },

  beforeMount () {
    this.__getScheduleWeekData(this.weekNumber, this.getScheduleData)
    this.$root.$on('service-activated', this.scheduleRefreshed)

    this.$root.$on('move-record-to-job-queue', this.moveRecordToJobQueue)
    this.$root.$on('activate-record', this.activateRecord)
  },

  beforeDestroy () {
    this.$root.$off('service-activated', this.updateInstallationSchedule)

    this.$root.$off('move-record-to-job-queue', this.moveRecordToJobQueue)
    this.$root.$off('activate-record', this.activateRecord)
  },

  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>
