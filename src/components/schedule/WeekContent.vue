<template>
  <table width="100%">
    <thead>
      <tr>
        <th width="48"><small>Day</small></th>
        <th width="120"><small>Date</small></th>
        <th width="240">AM</th>
        <th width="240">PM</th>
        <th width="240">Afterhours</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, date) of weekData" :key="date">
        <td><small><strong>{{ getDayName(date) }}</strong></small></td>
        <td><small>{{ date }}</small></td>
        <td>
          <ScheduleWeekCol
            :date="date"
            period="am"
            :records="weekData[date].am"
          />
        </td>
        <td>
          <ScheduleWeekCol
            :date="date"
            period="pm"
            :records="weekData[date].pm"
          />
        </td>
        <td>
          <ScheduleWeekCol
            :date="date"
            period="afterhours"
            :records="weekData[date].afterhours"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'WeekContent',
  components: {
    ScheduleWeekCol: () => import('@/components/schedule/ScheduleWeekCol.vue')
  },

  props: ['weekData'],

  data: () => ({
    records: null,
    ready: false
  }),

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
