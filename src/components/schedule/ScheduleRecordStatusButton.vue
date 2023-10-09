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
          <table>
            <tbody>
              <tr>
                <td class="pl-4">
                  <v-btn text small v-if="record.status === 'Awaiting for confirmation'" @click="confirm">
                    Confirm
                  </v-btn>
                  <v-btn text small @click="activation = true">
                    Activate from date:
                  </v-btn>
                  <v-btn text small v-if="record.status === 'Awaiting for confirmation'" @click="reject">
                    Reject
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="activation">
            <SelectDateOfStatusChanging
              title="Activation date"
              :date.sync="record.activationDate"
              :action.sync="activationInfoDialog"
              :max="new Date().toISOString()"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <ConnectionDataForActivation
      v-if="activationInfoDialog"
      :opened.sync="activationInfoDialog"
      :data.sync="record.connectionData"
      :submitted.sync="activationSubmitted"
    />
  </v-card>
</template>

<script>

import { serviceStatusIconsHandler } from '@/controllers/data-handlers'
import { serviceIconColors } from '@/configs/serviceIconColors'

export default {
  name: 'ScheduleRecordStatusButton',

  components: {
    ConnectionDataForActivation: () => import('@/components/schedule/ConnectionDataForActivation.vue'),
    SelectDateOfStatusChanging: () => import('@/components/schedule/SelectDateOfStatusChanging.vue')
  },

  props: ['date', 'period', 'record'],

  data: () => ({
    activation: false,
    activationInfoDialog: false,
    activationSubmitted: false,
    icons: serviceStatusIconsHandler(),
    colors: serviceIconColors
  }),

  computed: {
    icon () {
      return this.icons && this.icons[this.record.status]
    },
    color () {
      return this.colors[this.record.status] || '#999'
    }
  },

  watch: {
    activationSubmitted (value) {
      if (value) {
        this.activationInfoDialog = false
        this.activationSubmitted = false
        this.activation = false
        this.activate()
      }
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
      }), this.catchJobResponse)

      this.$root.$emit('move-record-to-job-queue', { customerId, serviceId, lots, installation })
    },

    catchJobResponse (data) {
      // console.log(data)
    },

    activate () {
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

      this.__changeServiceDeliveryStatus(this.record, this.rejected)
    },

    rejected (customer) {
      this.$root.$emit('reject-record', customer.services)
    }
  }
}
</script>
