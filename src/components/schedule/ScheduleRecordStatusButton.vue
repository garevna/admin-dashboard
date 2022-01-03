<template>
  <v-card flat class="transparent" width="280" height="auto">
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header hide-actions>
          <v-icon :color="color" small class="mr-1">
            {{ icon }}
          </v-icon>
          <v-btn
            text
            small
            color="primary"
          >
            {{ record.status }}
          </v-btn>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item
              v-if="record.status === 'Awaiting for confirmation' || record.status === 'Awaiting for cancelation'"
              @click="confirm"
            >
              <v-list-item-title>
                Confirm
              </v-list-item-title>
            </v-list-item>

            <v-list-item @click="activation = true">
              <v-list-item-title> Activate from date: </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="record.status === 'Awaiting for confirmation'"
              @click="reject"
            >
              <v-list-item-title>
                Reject
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <div v-if="activation">
            <v-date-picker
              label="Activation date"
              v-model="record.activationDate"
              @input="menu = false"
              color="primary"
              :first-day-of-week="1"
              no-title
              scrollable
              max-width="270"
              style="margin-left: -16px"
            />
            <v-btn
              outlined
              small
              color="primary"
              :disabled="!record.activationDate"
              @click="activate"
              width="270"
            >
              Submit
            </v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

import { serviceStatusIconsHandler } from '@/controllers/data-handlers'

export default {
  name: 'ScheduleRecordStatusButton',

  props: ['date', 'period', 'record'],

  data: () => ({
    activation: false,
    icons: serviceStatusIconsHandler(),
    colors: {
      Active: '#09b',
      'Awaiting for connection': 'primary',
      'Awaiting for confirmation': 'primary',
      'Awaiting confirmation': 'primary',
      'Awaiting for scheduling': '#888',
      'In job queue': '#888',
      'Unable to connect': '#555',
      'Not connected': '#f00'
    }
  }),

  computed: {
    icon () {
      return this.icons && this.icons[this.record.status]
    },
    color () {
      return this.colors[this.record.status] || '#999'
    }
  },

  methods: {
    confirm () {
      if (this.record.status === 'In job queue') return

      const { customerId, serviceId, lots } = this.record

      const lot = lots.find(item => item.date === this.date)

      const installation = {
        date: this.date,
        period: this.period,
        message: lot.message || ''
      }

      this.__putRecordToJobQueue(Object.assign({}, {
        customerId,
        serviceId,
        lots,
        status: 'In job queue',
        modified: Date.now(),
        installation
      }))

      this.$root.$emit('move-record-to-job-queue', { customerId, serviceId, lots, installation })
    },

    activate () {
      // if (this.record.status !== 'In job queue') return
      this.__activateService(this.record, this.activated)
    },

    activated (result) {
      this.$root.$emit('activate-record', {
        week: this.getWeekNumber(this.date),
        date: this.date,
        period: this.period,
        customerId: this.record.customerId,
        serviceId: this.record.serviceId
      })
    },

    reject () {
      if (this.record.status === 'In job queue') return

      this.$emit('update:record', Object.assign(this.record, {
        status: 'Awaiting for scheduling',
        modified: Date.now(),
        lots: []
      }))
      this.__changeServiceDeliveryStatus(this.record, response => console.log(response))

      // this.__updateScheduleRecordStatus(Object.assign({}, this.record, {
      //   status: 'Awaiting for scheduling',
      //   modified: Date.now(),
      //   lots: []
      // }))
    }
  }
}
</script>
