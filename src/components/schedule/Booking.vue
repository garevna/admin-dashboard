<template>
  <v-container>
    <v-card flat class="transparent mx-auto" max-width="900">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel v-for="(requests, date) in records" :key="date">
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
                </tr>
              </thead>

              <tbody>
                <tr v-for="record of requests" :key="record._id">
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
    records: null,
    selected: null,
    status: null
  }),

  methods: {
    getData (data) {
      console.log('============ BOOKING REQUESTS: =============\n', data)
      // this.records = data.filter(record => record.status === 'Awaiting for connection')
      this.records = data
    },

    showCustomerDetails (customer) {
      this.$root.$emit('open-customer-info-popup', {
        name: `${customer.firstName} ${customer.lastName}`,
        address: `${customer.apartmentNumber}/${customer.address}`,
        phone: customer.phoneMobile || customer.phoneWork
      })
    },

    updated (event) {
      console.log(event.data)
      this.selected.status = this.status
    },

    changeRecordStatus (record, status) {
      console.log(record)
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
    }
  },

  beforeMount () {
    this.$root.$on('service-delivery-status-updated', this.updated)
    this.$root.$on('booking-requests-received', this.getData)
    this.__getBookingRequests(this.weekNumber)
  },

  beforeDestroy () {
    this.$root.$off('booking-requests-received', this.getData)
    this.$root.$off('service-delivery-status-updated', this.updated)
  }
}
</script>

<style scoped>
th {
  text-align: center;
  background: #dedede;
}
small {
  font-size: 12px;
}
</style>
