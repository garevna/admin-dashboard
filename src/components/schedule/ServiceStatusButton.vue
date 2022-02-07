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
            :disabled="record.status === 'Awaiting for scheduling'"
          >
            {{ record.status }}
          </v-btn>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item
              v-if="record.status === 'Awaiting for connection' || record.status === 'Unable to connect'"
              @click="changeRecordStatus('Awaiting for scheduling')"
            >
              <v-list-item-title>
                Awaiting for scheduling
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="record.status === 'Awaiting for connection'"
              @click="changeRecordStatus('Unable to connect')"
            >
              <v-list-item-title>
                Unable to connect
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="record.status !== 'Active' && record.status !== 'Awaiting to be suspended' && record.status !== 'Awaiting for cancelation'" @click="activation = true">
              <v-list-item-title>
                <v-icon color="#f50">mdi-alert</v-icon>
                Set active from <b>{{ record.activationDate }}</b>
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <v-list-item v-if="record.status === 'Awaiting to be suspended'" @click="suspend = true">
            <v-list-item-title>
              <v-icon color="#f50">mdi-alert</v-icon>
              Suspend from <b>{{ record.suspendDate }}</b>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="record.status === 'Awaiting for cancelation'" @click="cancel = true">
            <v-list-item-title>
              <v-icon color="#f50">mdi-alert</v-icon>
              Canceled from <b>{{ record.cancelDate }}</b>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="record.status === 'Awaiting to be resumed'" @click="resume = true">
            <v-list-item-title>
              <v-icon color="#f50">mdi-alert</v-icon>
              Resumed from <b>{{ record.resumeDate }}</b>
            </v-list-item-title>
          </v-list-item>

          <div v-if="suspend">
            <SelectDateOfStatusChanging
              title="Suspension date"
              :date.sync="record.suspendDate"
              :action.sync="suspendSubmitted"
            />
          </div>

          <div v-if="cancel">
            <SelectDateOfStatusChanging
              title="Cancelation date"
              :date.sync="record.cancelDate"
              :action.sync="cancelSubmitted"
            />
          </div>

          <div v-if="resume">
            <SelectDateOfStatusChanging
              title="Service resume date"
              :date.sync="record.resumeDate"
              :action.sync="resumeSubmitted"
            />
          </div>

          <div v-if="activation">
            <SelectDateOfStatusChanging
              title="Activation date"
              :date.sync="record.activationDate"
              :action.sync="activationSubmitted"
            />
            <!-- <v-date-picker
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
            </v-btn> -->
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

import { serviceStatusIconsHandler } from '@/controllers/data-handlers'

export default {
  name: 'ServiceStatusButton',

  components: {
    SelectDateOfStatusChanging: () => import('@/components/schedule/SelectDateOfStatusChanging.vue')
  },

  props: ['record', 'activated'],

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
        this.changeRecordStatus('Suspended')
        this.suspend = false
        this.suspendSubmitted = false
      }
    },

    resumeSubmitted (value) {
      if (value) {
        this.changeRecordStatus('Active')
        this.resume = false
        this.resumeSubmitted = false
      }
    },

    cancelSubmitted (value) {
      if (value) {
        this.changeRecordStatus('Canceled')
        this.cancel = false
        this.cancelSubmitted = false
      }
    }
  },

  methods: {
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
      console.log('STATUS UPDATED:\n', response)
    }
  }
}
</script>
