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

  methods: {
    getScheduleData (data) {
      this.weeks = data
      this.ready = true
    },
    updateInstallationSchedule (data) {
      console.log('SCHEDULE DATA UPDATED\n', data)
      this.weeks = data
    }
  },

  beforeMount () {
    this.$root.$on('schedule-week-data-received', this.getScheduleData)
    this.__getScheduleWeekData(this.weekNumber)
    this.$root.$on('moved-to-job-queue', this.updateInstallationSchedule)
    this.$root.$on('service-activated', this.updateInstallationSchedule)
  },

  beforeDestroy () {
    this.$root.$off('schedule-week-data-received', this.getScheduleData)
    this.$root.$off('moved-to-job-queue', this.updateInstallationSchedule)
    this.$root.$off('service-activated', this.updateInstallationSchedule)
  }
}
</script>
