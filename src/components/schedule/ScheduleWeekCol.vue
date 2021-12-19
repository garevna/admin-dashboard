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

      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
            {{ record.status }}
          </v-btn>
        </template>
        <v-list v-if="record.status === 'Awaiting for confirmation' || record.status === 'Awaiting confirmation'">
          <v-list-item @click="confirm(record)">
            <v-list-item-title>
              Confirm
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="reject(record)">
            <v-list-item-title>
              Reject
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="activate(record)">
            <v-list-item-title>
              Activate service
            </v-list-item-title>
          </v-list-item>
        </v-list> -->

        <!-- <v-list v-if="record.status === 'In job queue'"> -->
          <!-- <v-list-item @click="reject(record)">
            <v-list-item-title>
              Reject installation
            </v-list-item-title>
          </v-list-item> -->
          <!-- <v-list-item @click="activate(record)">
            <v-list-item-title>
              Activate service
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- <v-btn text small>
        <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
        {{ record.status }}
      </v-btn> -->
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
        phone: record.customer.phone
      })
    },

    // confirm (record) {
    //   if (record.status === 'In job queue') return
    //
    //   const { customerId, serviceId, lots } = record
    //
    //   const lot = lots.find(item => item.date === this.date)
    //
    //   const installation = {
    //     date: this.date,
    //     period: this.period,
    //     message: lot.message || ''
    //   }
    //   this.__putRecordToJobQueue(Object.assign({}, {
    //     customerId,
    //     serviceId,
    //     lots,
    //     status: 'In job queue',
    //     modified: Date.now(),
    //     installation
    //   }))
    //   this.$root.$emit('move-record-to-job-queue', { customerId, serviceId, lots, installation })
    // },

    // activate (record) {
    //   if (record.status !== 'In job queue') return
    //   this.__activateService(record, response => console.log(response))
    //   this.$root.$emit('activate-record', {
    //     week: this.getWeekNumber(this.date),
    //     date: this.date,
    //     period: this.period,
    //     customerId: record.customerId,
    //     serviceId: record.serviceId
    //   })
    // },

    // reject (record) {
    //   if (record.status === 'In job queue') return
    //
    //   this.__updateScheduleRecordStatus(Object.assign({}, record, {
    //     status: 'Awaiting for scheduling',
    //     modified: Date.now(),
    //     lots: []
    //   }))
    // },

    getIcon (status) {
      const colors = {
        Active: '#999',
        'Awaiting for connection': '#999',
        'Awaiting for confirmation': 'primary',
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
