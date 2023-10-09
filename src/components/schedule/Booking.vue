<template>
  <v-container class="mb-12 pb-12">
    <v-card flat class="transparent mx-auto" max-width="900">
      <v-toolbar flat class="transparent">
        <v-text-field
          v-model="search"
          outlined
          hide-details
          dense
          max-width="200"
          prepend-inner-icon="mdi-magnify"
        />
        <v-spacer />
        <v-btn text @click="refresh" class="mr-12 mb-5">
          <v-icon>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="filteredRecords"
        item-key="uniqueCode"
        :items-per-page="filteredRecords.length"
        :sort-by="['modified']"
        :sort-desc="[true, false, false]"
        multi-sort
        group-by="modified"
        class="transparent"
        hide-default-footer
      >
        <template v-slot:group.header="{ items, isOpen, toggle }">
          <th colspan="2">
            <v-icon @click="toggle" :color="isOpen ? '#900' : '#999'">
              {{ isOpen ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}
            </v-icon>
            {{ items[0].modified }}
          </th>
        </template>

        <template v-slot:item.customer.uniqueCode="{ item }">
          <v-btn text @click="clickCallback(item.customer)">
            {{ item.customer.uniqueCode }}
          </v-btn>
        </template>

        <template v-slot:item.status="{ item }">
          <BookingRecordStatusButton
            :record.sync="item"
            :activated.sync="activated"
            :suspended.sync="suspended"
            :canceled.sync="canceled"
            :resumed.sync="resumed"
            :search="search"
          />
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            More info about {{ item.serviceName }}
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>

import BookingRecordStatusButton from '@/components/schedule/BookingRecordStatusButton.vue'

export default {
  name: 'Booking',

  components: {
    BookingRecordStatusButton
  },

  data: () => ({
    search: '',
    selected: null,
    activated: false,
    suspended: false,
    canceled: false,
    resumed: false,
    status: null,
    ready: false,
    icons: {},
    records: [],
    headers: [
      { text: 'Date', value: 'modified' },
      { text: 'Customer unique code', value: 'customer.uniqueCode' },
      { text: 'Service name', value: 'serviceName' },
      { text: 'Status', value: 'status' }
    ]
  }),

  computed: {
    filteredRecords () {
      return this.search
        ? this.records.filter(record => this.test(record.customer.uniqueCode) || this.test(record.status) || this.test(record.serviceName))
        : this.records
    }
  },

  watch: {
    activated (val) {
      if (val) {
        this.__refreshSchedule(this.scheduleRefreshed)
        this.activated = false
      }
    },
    canceled (val) {
      if (val) {
        this.__refreshSchedule(this.scheduleRefreshed)
        this.canceled = false
      }
    },
    suspended (val) {
      if (val) {
        this.__refreshSchedule(this.scheduleRefreshed)
        this.suspended = false
      }
    },
    resumed (val) {
      if (val) {
        this.__refreshSchedule(this.scheduleRefreshed)
        this.resumed = false
      }
    }
  },

  methods: {
    test (source) {
      return source.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
    },

    clickCallback (customer) {
      this.showCustomerDetails(customer)
    },

    getData (booking) {
      this.records = booking.map(item => Object.assign(item, {
        modified: new Date(item.modified).toISOString().slice(0, 10),
        uniqueCode: item.customer.uniqueCode
      }))

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

    showInfo (item) {
      //
    },

    refresh () {
      this.ready = false
      this.__refreshSchedule(this.scheduleRefreshed)
    },

    scheduleRefreshed (data) {
      this.getData(data.booking)
    },

    getUpdates (data) {
      if (data.length) this.__getBookingRequests(this.getData)
    }
  },

  beforeMount () {
    this.__getBookingRequests(this.getData)
  },

  beforeDestroy () {
    this.$root.$off('customers-updates-received', this.getUpdates)
    this.$root.$off('schedule-updates-received', this.getUpdates)
    this.$root.$off('service-delivery-status-updated', this.updated)
  },

  mounted () {
    this.$root.$on('customers-updates-received', this.getUpdates)
    this.$root.$on('schedule-updates-received', this.getUpdates)
    this.$root.$on('service-delivery-status-updated', this.updated)
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
