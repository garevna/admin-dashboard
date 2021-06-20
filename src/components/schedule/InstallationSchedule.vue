<template>
  <v-card flat class="transparent mx-auto" max-width="1200">
    <v-row justify="end">
      <v-btn text @click="refresh" class="mr-12 mb-5">
        <v-icon>mdi-refresh</v-icon>
        Refresh
      </v-btn>
    </v-row>
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
      this.weeks = data
    },

    refresh () {
      this.ready = false
      this.__refreshSchedule()
    },

    scheduleRefreshed (event) {
      this.getScheduleData(event.result.schedule)
    }
  },

  beforeMount () {
    this.$root.$on('schedule-week-data-received', this.getScheduleData)
    this.__getScheduleWeekData(this.weekNumber)
    this.$root.$on('moved-to-job-queue', this.updateInstallationSchedule)
    this.$root.$on('service-activated', this.updateInstallationSchedule)
    this.$root.$on('schedule-data-refreshed', this.scheduleRefreshed)
  },

  beforeDestroy () {
    this.$root.$off('schedule-week-data-received', this.getScheduleData)
    this.$root.$off('moved-to-job-queue', this.updateInstallationSchedule)
    this.$root.$off('service-activated', this.updateInstallationSchedule)
    this.$root.$off('schedule-data-refreshed', this.scheduleRefreshed)
  },

  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>
