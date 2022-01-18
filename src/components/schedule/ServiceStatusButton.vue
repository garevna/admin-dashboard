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

            <v-list-item v-if="record.status !== 'Active'" @click="activation = true">
              <v-list-item-title>
                <v-icon color="#f50">mdi-alert</v-icon>
                Set active from <b>{{ record.activationDate }}</b>
              </v-list-item-title>
            </v-list-item>
          </v-list>

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
    activationSubmitted: false,
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

  watch: {
    activationSubmitted (value) {
      if (value) {
        this.activate()
        this.activation = false
        this.activationSubmitted = false
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
      // console.log('STATUS UPDATED:\n', response)
    }
  }
}
</script>
