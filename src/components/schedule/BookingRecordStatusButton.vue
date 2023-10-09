<template>
  <v-card flat class="transparent" width="340" height="auto">
    <v-expansion-panels flat class="transparent" dense>
      <v-expansion-panel>
        <v-expansion-panel-header hide-actions>
          <v-icon :color="color" small class="mr-1">
            {{ icon }}
          </v-icon>
          <v-btn
            text
            small
            color="primary"
            :disabled="record.status === 'Awaiting for scheduling'"
          >
            {{ record.status }}
          </v-btn>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <table class="transparent ml-12">
            <tbody>
              <tr>
                <td class="pl-4">
                  <v-btn
                    text
                    small
                    v-if="record.status === 'Awaiting for connection' || record.status === 'Unable to connect'"
                    @click="changeRecordStatus('Awaiting for scheduling')"
                  >
                    Awaiting for scheduling
                  </v-btn>

                  <v-btn
                    text
                    small
                    v-if="record.status === 'Awaiting for connection'"
                    @click="changeRecordStatus('Unable to connect')"
                  >
                    Unable to connect
                  </v-btn>

                  <v-btn
                    text
                    small
                    v-if="record.status !== 'Active' && record.status !== 'Awaiting to be suspended' && record.status !== 'Awaiting for cancelation'"
                    @click="activation = true"
                  >
                    Set active from <b>{{ record.activationDate }}</b>
                  </v-btn>

                  <v-btn
                    text
                    small
                    v-if="record.status === 'Awaiting to be suspended'"
                    @click="suspend = true"
                  >
                    <small v-if="record.suspendedDate">
                      <v-icon small color="#999">mdi-cog-pause</v-icon>
                      Will be suspended: <b class="ml-2">{{ record.suspendedDate }}</b>
                    </small>
                    <small v-else>
                      <v-icon small color="#f50">mdi-calendar-question</v-icon>
                      Request to suspend <b class="ml-2">{{ record.suspendDate }}</b>
                    </small>
                  </v-btn>

                  <v-btn
                    text
                    small
                    v-if="record.status === 'Awaiting for cancelation'"
                    @click="cancel = true"
                  >
                    <small v-if="record.canceledDate">
                      <v-icon small color="#999">mdi-cog-pause</v-icon>
                      Will be canceled: <b class="ml-2">{{ record.canceledDate }}</b>
                    </small>
                    <small v-else>
                      <v-icon small color="#f50">mdi-calendar-question</v-icon>
                      Request to cancel <b class="ml-2">{{ record.cancelDate }}</b>
                    </small>
                  </v-btn>

                  <v-btn
                    text
                    small
                    v-if="record.status === 'Awaiting to be resumed'"
                    @click="resume = true"
                  >
                    <small v-if="record.resumedDate">
                      <v-icon small color="#999">mdi-cog-pause</v-icon>
                      Will be resumed: <b class="ml-2">{{ record.resumedDate }}</b>
                    </small>
                    <small v-else>
                      <v-icon small color="#f50">mdi-calendar-question</v-icon>
                      Request to resume <b class="ml-2">{{ record.resumeDate }}</b>
                    </small>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="suspend">
            <SelectDateOfStatusChanging
              title="Suspension date"
              :date.sync="record.suspendedDate"
              :action.sync="suspendSubmitted"
              :min="requestMinDate"
            />
          </div>

          <div v-if="cancel">
            <SelectDateOfStatusChanging
              title="Cancelation date"
              :date.sync="record.canceledDate"
              :action.sync="cancelSubmitted"
              :min="requestMinDate"
              :max="requestMaxDate"
            />
          </div>

          <div v-if="resume">
            <SelectDateOfStatusChanging
              title="Service resume date"
              :date.sync="record.resumedDate"
              :action.sync="resumeSubmitted"
              :min="requestMinDate"
              :max="requestMaxDate"
            />
          </div>

          <div v-if="activation">
            <SelectDateOfStatusChanging
              title="Activation date"
              :date.sync="record.activationDate"
              :action.sync="activationInfoDialog"
              :max="new Date().toISOString().slice(0, 10)"
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
  name: 'BookingRecordStatusButton',

  components: {
    ConnectionDataForActivation: () => import('@/components/schedule/ConnectionDataForActivation.vue'),
    SelectDateOfStatusChanging: () => import('@/components/schedule/SelectDateOfStatusChanging.vue')
  },

  props: ['record', 'activated', 'canceled', 'suspended', 'resumed'],

  data: () => ({
    activation: false,
    activationInfoDialog: false,
    suspend: false,
    resume: false,
    cancel: false,
    activationSubmitted: false,
    suspendSubmitted: false,
    resumeSubmitted: false,
    cancelSubmitted: false,
    icons: serviceStatusIconsHandler(),
    colors: serviceIconColors,
    requestMinDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
    requestMaxDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10)
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
        this.activation = false
        this.activationSubmitted = false
        this.activate()
      }
    },

    suspendSubmitted (value) {
      if (value) {
        this.__approveServiceSuspension(this.record.customerId, this.record.serviceId, this.record.suspendedDate, this.getSuspendedResponse)
      }
    },

    resumeSubmitted (value) {
      if (value) {
        this.__approveServiceResuming(this.record.customerId, this.record.serviceId, this.record.resumedDate, this.getResumedResponse)
      }
    },

    cancelSubmitted (value) {
      if (value) {
        this.__approveServiceCancelation(this.record.customerId, this.record.serviceId, this.record.canceledDate, this.getCanceledResponse)
      }
    }
  },

  methods: {
    getSuspendedResponse () {
      this.$emit('update:suspended', true)
      this.suspend = false
      this.suspendSubmitted = false
    },

    getCanceledResponse () {
      this.$emit('update:canceled', true)
      this.cancel = false
      this.cancelSubmitted = false
    },

    getResumedResponse (data) {
      this.$emit('update:resumed', true)
      this.resume = false
      this.resumeSubmitted = false
    },

    changeRecordStatus (status) {
      this.$emit('update:record', Object.assign(this.record, { status }))
      this.__changeServiceDeliveryStatus(this.record, this.statusChanged)
    },

    activate () {
      this.__activateService(this.record, this.serviceActivated)
    },

    serviceActivated (response) {
      this.$emit('update:record', Object.assign(this.record, { status: 'Active' }))
      this.$emit('update:activated', true)
    },

    statusChanged (response) {
      // console.log('STATUS UPDATED:\n', response)
    }
  }
}
</script>
