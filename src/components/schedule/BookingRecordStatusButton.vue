<template>
  <v-card flat class="transparent" width="340" height="auto">
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
            :disabled="record.status === 'Awaiting for scheduling'"
          >
            {{ record.status }}
          </v-btn>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <table>
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
          <v-list dense>
            <!-- <v-list-item
              v-if="record.status === 'Awaiting for connection' || record.status === 'Unable to connect'"
              @click="changeRecordStatus('Awaiting for scheduling')"
            >
              <v-list-item-title>
                Awaiting for scheduling
              </v-list-item-title>
            </v-list-item> -->

            <!-- <v-list-item
              v-if="record.status === 'Awaiting for connection'"
              @click="changeRecordStatus('Unable to connect')"
            >
              <v-list-item-title>
                Unable to connect
              </v-list-item-title>
            </v-list-item> -->

            <!-- <v-list-item v-if="record.status !== 'Active' && record.status !== 'Awaiting to be suspended' && record.status !== 'Awaiting for cancelation'" @click="activation = true">
              <v-list-item-title>
                <v-icon small color="#900">mdi-connection</v-icon>
                Set active from <b>{{ record.activationDate }}</b>
              </v-list-item-title>
            </v-list-item> -->

            <!-- <v-list-item v-if="record.status === 'Awaiting for cancelation'" @click="cancel = true">
              <v-list-item-title>
                {{ record.canceledDate }}/{{ record.cancelDate }}
                <v-icon small color="#999">{{ record.canceledDate ? 'mdi-cog-pause' : 'mdi-calendar-question' }}</v-icon>
                {{ record.canceledDate ? 'Will be canceled' : 'Request to cancel' }} <b class="ml-2">{{ record.canceledDate ? record.canceledDate : record.cancelDate }}</b>
              </v-list-item-title>
            </v-list-item> -->

            <!-- <v-list-item v-if="record.status === 'Awaiting to be suspended'" @click="suspend = true">
              <v-list-item-title v-if="record.suspendedDate">
                <v-icon small color="#999">mdi-cog-pause</v-icon>
                Will be suspended <b class="ml-2">{{ record.suspendedDate }}</b>
              </v-list-item-title>
              <v-list-item-title v-else>
                <v-icon small color="#f50">mdi-calendar-question</v-icon>
                Request to suspend <b class="ml-2">{{ record.suspendDate }}</b>
              </v-list-item-title>
            </v-list-item> -->

            <!-- <v-list-item v-if="record.status === 'Awaiting for cancelation'" @click="cancel = true">
              <v-list-item-title v-if="record.canceledDate">
                <v-icon small color="#999">mdi-close-network</v-icon>
                Will be canceled <b class="ml-2">{{ record.canceledDate }}</b>
              </v-list-item-title>

              <v-list-item-title v-else>
                <v-icon small color="#900">mdi-calendar-question</v-icon>
                Request to cancel <b class="ml-2">{{ record.cancelDate }}</b>
              </v-list-item-title>
            </v-list-item> -->

            <!-- <v-list-item v-if="record.status === 'Awaiting to be resumed'" @click="resume = true">
              <v-list-item-title v-if="record.resumedDate">
                <v-icon small color="#999">mdi-history</v-icon>
                Will be resumed <b class="ml-2">{{ record.resumedDate }}</b>
              </v-list-item-title>
              <v-list-item-title v-else>
                <v-icon small color="#900">mdi-calendar-question</v-icon>
                Request to resume <b class="ml-2">{{ record.resumeDate }}</b>
              </v-list-item-title>
            </v-list-item> -->
          </v-list>

          <div v-if="suspend">
            <SelectDateOfStatusChanging
              title="Suspension date"
              :date.sync="record.suspendedDate"
              :action.sync="suspendSubmitted"
              :min="requestMinDate"
              :max="requestMaxDate"
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
              :action.sync="activationSubmitted"
              :max="new Date().toISOString().slice(0, 10)"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

import { serviceStatusIconsHandler } from '@/controllers/data-handlers'

export default {
  name: 'BookingRecordStatusButton',

  components: {
    SelectDateOfStatusChanging: () => import('@/components/schedule/SelectDateOfStatusChanging.vue')
  },

  props: ['record', 'activated', 'canceled', 'suspended', 'resumed'],

  data: () => ({
    activation: false,
    suspend: false,
    resume: false,
    cancel: false,
    activationSubmitted: false,
    suspendSubmitted: false,
    resumeSubmitted: false,
    cancelSubmitted: false,
    icons: serviceStatusIconsHandler(),
    colors: {
      Active: '#09b',
      'Awaiting for connection': 'primary',
      'Awaiting for confirmation': 'primary',
      'Awaiting to be suspended': 'primary',
      'Awaiting to be resumed': 'primary',
      'Awaiting for cancelation': 'primary',
      'Awaiting confirmation': 'primary',
      'Awaiting for scheduling': '#888',
      'In job queue': '#888',
      'Unable to connect': '#555',
      'Not connected': '#f00'
    },
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
        this.activate()
        this.activation = false
        this.activationSubmitted = false
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
      // this.__refreshSchedule(this.scheduleRefreshed)
      this.$emit('update:suspended', true)
      this.suspend = false
      this.suspendSubmitted = false
    },

    getCanceledResponse () {
      // this.__refreshSchedule(this.scheduleRefreshed)
      this.$emit('update:canceled', true)
      this.cancel = false
      this.cancelSubmitted = false
    },

    getResumedResponse (data) {
      // this.__refreshSchedule(this.scheduleRefreshed)
      this.$emit('update:resumed', true)
      this.resume = false
      this.resumeSubmitted = false
    },

    changeRecordStatus (status) {
      this.$emit('update:record', Object.assign(this.record, { status }))
      this.__changeServiceDeliveryStatus(this.record, this.statusChanged)
    },

    activate () {
      this.$emit('update:record', Object.assign(this.record, { status: 'Active' }))
      this.__activateService(this.record, this.serviceActivated)
    },

    serviceActivated (response) {
      this.activation = false
      this.$emit('update:activated', true)
    },

    statusChanged (response) {
      // console.log('STATUS UPDATED:\n', response)
    }
  }
}
</script>
