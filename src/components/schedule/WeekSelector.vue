<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="1200">
    <v-row class="mx-auto mt-5" style="max-width: 240px">
      <DatePicker :date.sync="date" style="max-width: 240px" />
    </v-row>

    <v-row justify="center">
      <v-spacer />

      <v-card-text v-if="date">
        <span class="mr-12">Week: <b>{{ weekNumber }} </b></span>
        <span class="ml-12"> From: <b>{{ startDate }}</b></span>
        <span class="ml-4"> to: <b>{{ endDate }}</b></span>
      </v-card-text>
    </v-row>

    <v-card flat class="transparent" v-if="weekNumber">
      <WeekContent
        :weekData.sync="weekData"
        :changedRecord.sync="changedRecord"
      />
    </v-card>
  </v-card>
</template>

<script>

export default {
  name: 'WeekSelector',

  components: {
    DatePicker: () => import('@/components/inputs/DatePicker.vue'),
    WeekContent: () => import('@/components/schedule/WeekContent.vue')
  },

  props: ['scheduleData'],

  data: () => ({
    ready: false,
    weekData: null,
    date: null,
    changedRecord: null
  }),

  computed: {
    available () {
      return []
    },
    weekNumber: {
      get () {
        return !this.date ? null : this.getWeekNumber(this.date)
      },
      set (value) {
        this.date = this.getWeekStartDateByWeekNumber(value)
      }
    },

    startDate () {
      return this.weekNumber ? this.getWeekStartDateByWeekNumber(this.weekNumber) : ''
    },

    endDate () {
      return this.weekNumber ? this.getWeekEndDateByWeekNumber(this.weekNumber) : ''
    }
  },

  watch: {
    weekNumber (value) {
      if (!value) return null
      this.weekData = Object.keys(this.scheduleData).includes(value.toString()) ? this.scheduleData[value] : this.createEmptyWeekSchedule(value)
    },

    scheduleData: {
      deep: true,
      handler (data) {
        const week = this.weekNumber.toString()
        this.weekData = Object.keys(this.scheduleData).includes(week) ? this.scheduleData[week] : this.createEmptyWeekSchedule(week)
      }
    }
  },

  methods: {
    createEmptyWeekSchedule (weekNumber) {
      const emptyDate = { am: [], pm: [], afterhours: [] }
      const weekDates = this.getWeekDatesByWeekNumber(weekNumber)
      return Object.assign({}, ...weekDates.map(date => ({ [date]: emptyDate })))
    }
  },

  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>
