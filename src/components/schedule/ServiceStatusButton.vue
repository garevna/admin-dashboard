<template>
  <v-card flat class="transparent" width="280" height="auto">
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header hide-actions>
          <v-icon :color="getIcon(record.status).color" small class="mr-1">
            {{ getIcon(record.status).icon }}
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
              @click="changeRecordStatus('Active')"
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

export default {
  name: 'ServiceStatusButton',

  props: ['record'],

  data: () => ({
    activation: false,
    icons: {
      Active: 'mdi-check-network-outline',
      'Awaiting for connection': 'mdi-calendar-question',
      'Awaiting for confirmation': 'mdi-calendar-clock',
      'Awaiting confirmation': 'mdi-calendar-clock',
      'Awaiting for scheduling': 'mdi-calendar-question',
      'In job queue': 'mdi-calendar-check',
      'Unable to connect': 'mdi-minus-network',
      'Not connected': 'mdi-alert'
    },
    colors: {
      Active: '#999',
      'Awaiting for connection': 'primary',
      'Awaiting for confirmation': 'primary',
      'Awaiting confirmation': 'primary',
      'Awaiting for scheduling': '#999',
      'In job queue': '#999',
      'Unable to connect': '#777',
      'Not connected': '#f00'
    }
  }),

  methods: {
    getIcon (status) {
      return { icon: this.icons[status], color: this.colors[status] }
    },
    changeRecordStatus (status) {
      this.$emit('update:record', Object.assign(this.record, { status }))
      this.__changeServiceDeliveryStatus(this.record)
    }
  }
}
</script>
