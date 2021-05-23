<template>
  <v-card flat class="transparent mx-auto" max-width="1200">
    <v-expansion-panels v-if="ready">
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
    changedRecord: null
  }),

  watch: {
    changedRecord: {
      deep: true,
      handler (record) {
        if (!record) return
        const index = this.records.findIndex(item => item._id === record._id)
        if (index === -1) return
        this.records[index] = record
        this.weeks = {}
        this.createWeeks()
        this.changedRecord = null
      }
    }
  },

  methods: {
    createNewWeek (weekNumber) {
      const dates = this.getWeekDatesByWeekNumber(weekNumber)
      this.weeks[weekNumber] = {}
      for (const date of dates) {
        Object.assign(this.weeks[weekNumber], { [date]: { am: [], pm: [], afterhours: [] } })
      }
    },

    getDateDetails (lot) {
      const weekNumber = this.getWeekNumber(lot.date)
      const weekDetails = {
        start: this.getWeekStartDateByWeekNumber(weekNumber),
        end: this.getWeekEndDateByWeekNumber(weekNumber)
      }
      return {
        weekNumber,
        weekDetails
      }
    },

    createWeeks () {
      for (const record of this.records) {
        if (record.status === 'Awaiting confirmation' || record.status === 'Awaiting for confirmation') {
          for (const lot of record.lots) {
            const dateDetails = this.getDateDetails(lot)

            if (!this.weeks[dateDetails.weekNumber]) this.createNewWeek(dateDetails.weekNumber)

            this.weeks[dateDetails.weekNumber][lot.date][lot.period].push(record)
          }
        }
        if (record.status === 'In job queue') {
          const dateDetails = this.getDateDetails(record.installation)
          this.weeks[dateDetails.weekNumber][record.installation.date][record.installation.period].push(Object.assign(record, dateDetails))
        }
      }
    },

    getScheduleData (data) {
      const sheduleStatuses = ['Awaiting confirmation', 'Awaiting for confirmation', 'In job queue']
      this.records = data.filter(record => sheduleStatuses.includes(record.status))

      this.createWeeks()
      this.ready = true
    }
  },

  beforeMount () {
    this.$root.$on('schedule-week-data-received', this.getScheduleData)
    this.__getScheduleWeekData(this.weekNumber)
  },

  beforeDestroy () {
    this.$root.$off('schedule-week-data-received', this.getScheduleData)
  }
}
</script>
