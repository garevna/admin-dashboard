<template>
  <v-container>
    <v-card flat class="transparent mx-auto" max-width="900">
      <table width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer unique code</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record of records" :key="record._id">
            <td>{{ new Date(record.modified).toDateString() }}</td>
            <td>
              <v-btn text @click="showCustomerDetails(record)">
                {{ record.uniqueCode || record.customerId }}
              </v-btn>
            </td>
            <td>
              <v-icon :color="getIcon(record.status).color" small class="mr-1">
                {{ getIcon(record.status).icon }}
              </v-icon>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ record.status }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="changeRecordStatus(record, 'Awaiting for scheduling')">
                    <v-list-item-title>
                      Awaiting for scheduling
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="changeRecordStatus(record, 'Unable to connect')">
                    <v-list-item-title>
                      Unable to connect
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- <v-btn text @click="changeRecordStatus(record)">

              </v-btn> -->
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
    <!-- <v-text-field
      v-model="trip.name"
      placeholder="Caribbean Cruise"
    ></v-text-field> -->
  </v-container>
</template>

<script>

export default {
  name: 'Booking',
  // props: ['weekNumber'],
  data: () => ({
    records: null,
    selected: null,
    status: null
  }),
  computed: {
    weekStartDate () {
      return this.getWeekStartDateByWeekNumber(this.weekNumber)
    },
    weekEndDate () {
      return this.getWeekEndDateByWeekNumber(this.weekNumber)
    }
  },
  methods: {
    getData (data) {
      console.log('============ BOOKING REQUESTS: =============\n', data)
      // this.records = data.filter(record => record.status === 'Awaiting for connection')
      this.records = data
    },
    updated (event) {
      console.log(event.data)
      this.selected.status = this.status
    },
    showCustomerDetails (record) {
      //
    },
    changeRecordStatus (record, status) {
      this.selected = record
      this.status = status
      const { _id, customerId, serviceId } = record
      this.__changeServiceDeliveryStatus(_id, { customerId, serviceId, status })
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
</style>
