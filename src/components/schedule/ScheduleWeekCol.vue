<template>
  <v-card flat class="transparent ma-0 pa-0">
    <v-card-text
      v-for="record of records"
      :key="record._id"
      class="schedule-lot"
    >
      <v-btn text small @click="showCustomerDetails(record)">
        <v-icon small color="#999"> mdi-account-box </v-icon>
        {{ record.customer.uniqueCode }}
      </v-btn>

      <p class="text-center"><sub><small>{{ record.serviceName }}</small></sub></p>

      <ScheduleRecordStatusButton
        :date="date"
        :period="period"
        :record.sync="record"
      />
    </v-card-text>
  </v-card>
</template>

<script>

import { serviceStatusIconsHandler } from '@/controllers/data-handlers'

export default {
  name: 'ScheduleWeekCol',

  props: ['date', 'period', 'records'],

  components: {
    ScheduleRecordStatusButton: () => import('@/components/schedule/ScheduleRecordStatusButton.vue')
  },

  data: () => ({
    icons: serviceStatusIconsHandler()
  }),

  methods: {
    showCustomerDetails (record) {
      this.$root.$emit('open-customer-info-popup', {
        name: record.customer.name,
        address: record.customer.address,
        phone: record.customer.phone,
        message: record.lots.filter(item => item.date === this.date && item.period === this.period)[0].message
      })
    },

    getIcon (status) {
      const colors = {
        Active: '#999',
        'Awaiting for connection': '#999',
        'Awaiting for confirmation': 'primary',
        'Awaiting for cancelation': 'primary',
        'Awaiting to be resumed': 'primary',
        'Awaiting to be suspended': 'primary',
        'Awaiting confirmation': 'primary',
        'Awaiting for scheduling': '#999',
        'In job queue': '#999',
        'Unable to connect': '#555',
        'Not connected': '#f00'
      }
      return { icon: this.icons[status], color: colors[status] || '#777' }
    }
  }
}
</script>

<style>
.v-expansion-panel::before {
  box-shadow: none !important;
}
.theme--light.v-expansion-panels .v-expansion-panel {
  background: transparent !important;
}
</style>

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
