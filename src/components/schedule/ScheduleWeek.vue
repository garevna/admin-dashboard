<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Week <strong class="ml-2">{{ weekNumber }}</strong>
      <p>
        <small>
          from <b class="week-date mx-2">{{ weekStartDate }}</b>
          to <b class="week-date ml-2">{{ weekEndDate }}</b>
        </small>
      </p>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <WeekContent :weekData.sync="weekData" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>

export default {
  name: 'ScheduleWeek',
  components: {
    WeekContent: () => import('@/components/schedule/WeekContent.vue')
  },

  props: ['weekNumber', 'weekData'],

  data: () => ({
    records: null,
    ready: false
  }),

  computed: {
    weekStartDate () {
      if (!this.weekNumber) return ''
      return this.getWeekStartDateByWeekNumber(this.weekNumber)
    },
    weekEndDate () {
      if (!this.weekNumber) return ''
      return this.getWeekEndDateByWeekNumber(this.weekNumber)
    }
  },
  methods: {
    getDayName (date) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(date).getDay()]
    }
  },

  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
table, th {
  background: #dfdfdf;
}
tbody {
  background: #fbfbfb;
}
td {
  border: solid 1px #dfdfdf;
  padding: 4px 8px;
}
/* b {
  font-weight: 900;
} */

.week-date {
  border: solid 1px #aaa;
  border-radius: 4px;
  padding: 4px 8px;
  color: #900;
}

.schedule-lot {
  border: solid 1px #ccc;
  border-radius: 4px;
}
</style>
