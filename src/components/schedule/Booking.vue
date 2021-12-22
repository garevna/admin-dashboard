<template>
  <v-container class="mb-12 pb-12">
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
                    <ServiceStatusButton :record.sync="record" :activated.sync="activated" />
                  </td>
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

import ServiceStatusButton from '@/components/schedule/ServiceStatusButton.vue'

export default {
  name: 'Booking',

  components: {
    ServiceStatusButton
  },

  data: () => ({
    panel: [],
    booking: null,
    selected: null,
    activated: false,
    status: null,
    ready: false,
    icons: {}
  }),

  watch: {
    activated (val) {
      if (val) {
        this.__refreshSchedule(this.scheduleRefreshed)
        this.activated = false
      }
    }
  },

  methods: {
    getData (booking) {
      this.panel = Object.keys(booking).map(value => Number(value))

      this.records = booking.map(item => Object.assign(item, { modified: new Date(item.modified).toISOString().slice(0, 10) }))

      const dates = Array.from(new Set(booking.map(record => record.modified)))

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
      console.log(record, status)
      this.selected = record
      this.status = status
      this.__changeServiceDeliveryStatus(Object.assign(record, { status }))
    },

    showInfo (item) {
      //
    },

    refresh () {
      this.ready = false
      this.__refreshSchedule(this.scheduleRefreshed)
    },

    scheduleRefreshed (data) {
      this.getData(data.booking)
    }
  },

  beforeMount () {
    this.$root.$on('service-delivery-status-updated', this.updated)
    this.__getBookingRequests(this.getData)
  },

  beforeDestroy () {
    this.$root.$off('service-delivery-status-updated', this.updated)
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
