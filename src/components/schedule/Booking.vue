<template>
  <v-container>
    <v-card flat class="transparent mx-auto" max-width="900">
      <v-row justify="end">
        <v-btn text @click="refresh" class="mr-12 mb-5">
          <v-icon>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </v-row>
      <v-expansion-panels v-model="panel" multiple v-if="ready">
        <v-expansion-panel v-for="(bookingRecords, date) in booking" :key="date">
          <v-expansion-panel-header>
            <b>{{ date }}</b>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <table width="100%">
              <thead>
                <tr>
                  <th>Customer unique code</th>
                  <th>Service name</th>
                  <th>Status</th>
                  <!-- <th>dev</th> -->
                </tr>
              </thead>

              <tbody>
                <tr v-for="record of bookingRecords" :key="record._id">
                  <td>
                    <v-btn text @click="showCustomerDetails(record.customer)">
                      <v-icon small>mdi-account</v-icon>
                      {{ record.customer.uniqueCode }}
                    </v-btn>
                  </td>
                  <td>
                    <p><small>{{ record.serviceName }}</small></p>
                  </td>
                  <td>
                      <v-icon :color="getIcon(record.status).color" small class="mr-1">
                        {{ getIcon(record.status).icon }}
                      </v-icon>
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            small
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            :disabled="record.status === 'Awaiting for scheduling'"
                          >
                            {{ record.status }}
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-if="record.status === 'Awaiting for connection' || record.status === 'Unable to connect'"
                            @click="changeRecordStatus(record, 'Awaiting for scheduling')"
                          >
                            <v-list-item-title>
                              Awaiting for scheduling
                            </v-list-item-title>
                          </v-list-item>

                          <v-list-item
                            v-if="record.status === 'Awaiting for connection'"
                            @click="changeRecordStatus(record, 'Unable to connect')"
                          >
                            <v-list-item-title>
                              Unable to connect
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                  </td>
                  <!-- <td>
                    <v-btn text @click="showInfo(record)">
                    .
                    </v-btn>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'Booking',

  data: () => ({
    panel: [],
    booking: null,
    selected: null,
    status: null,
    ready: false
  }),

  methods: {
    getData (data) {
      this.records = data.map(item => Object.assign(item, { modified: new Date(item.modified).toISOString().slice(0, 10) }))

      const dates = Array.from(new Set(data.map(record => record.modified)))

      this.booking = Object.assign({}, ...dates.map(date => ({ [date]: [] })))

      this.records.forEach(record => this.booking[record.modified].push(record))

      this.ready = true
    },

    showCustomerDetails (customer) {
      this.$root.$emit('open-customer-info-popup', {
        name: customer.name,
        address: customer.address,
        phone: customer.phone
      })
    },

    updated (event) {
      this.selected.status = this.status
    },

    changeRecordStatus (record, status) {
      this.selected = record
      this.status = status
      this.__changeServiceDeliveryStatus(Object.assign(record, { status }))
    },

    getIcon (status) {
      const icons = {
        Active: 'mdi-check-network-outline',
        'Awaiting for connection': 'mdi-calendar-question',
        'Awaiting for confirmation': 'mdi-calendar-clock',
        'Awaiting confirmation': 'mdi-calendar-clock',
        'Awaiting for scheduling': 'mdi-calendar-question',
        'In job queue': 'mdi-calendar-check',
        'Unable to connect': 'mdi-minus-network',
        'Not connected': 'mdi-alert'
      }
      const colors = {
        Active: '#999',
        'Awaiting for connection': 'primary',
        'Awaiting for confirmation': 'primary',
        'Awaiting confirmation': 'primary',
        'Awaiting for scheduling': '#999',
        'In job queue': '#999',
        'Unable to connect': '#777',
        'Not connected': '#f00'
      }
      return { icon: icons[status], color: colors[status] }
    },
    showInfo (item) {
      //
    },

    refresh () {
      this.ready = false
      this.__refreshSchedule()
    },

    scheduleRefreshed (event) {
      this.getData(event.result.booking)
    }
  },

  beforeMount () {
    this.$root.$on('service-delivery-status-updated', this.updated)
    this.$root.$on('booking-requests-received', this.getData)
    this.$root.$on('schedule-data-refreshed', this.scheduleRefreshed)
    this.__getBookingRequests()
  },

  beforeDestroy () {
    this.$root.$off('booking-requests-received', this.getData)
    this.$root.$off('service-delivery-status-updated', this.updated)
    this.$root.$off('schedule-data-refreshed', this.scheduleRefreshed)
  },

  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
.theme--light.v-expansion-panels .v-expansion-panel {
  background: transparent !important;
}
.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
  border: 0 !important;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--next-active {
  background: transparent!important;
}
.v-expansion-panel::before {
  box-shadow: none!important;
}
table {
  border-collapse: collapse;
}
th {
  text-align: center;
  background: #dedede;
}
td {
  border: solid 1px #ddd;
  padding: 4px 8px;
  vertical-align: middle;
}
small {
  font-size: 12px;
}
</style>
