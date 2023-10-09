<template>
  <v-container>
    <v-card v-if="ready" flat class="transparent" max-height="320" style="overflow-y: auto">
      <v-data-table
        :headers="headers"
        :items="requests"
        item-key="index"
        :items-per-page="requests.length"
        hide-default-footer
        dense
        sort-by="date"
        :sort-desc.sync="sortDesc"
        @click:row="gotoSchedule"
      />
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'PendingConnectionRequests',

  props: ['goToSchedule'],

  data: () => ({
    ready: false,
    requests: null,
    sortDesc: true,
    headers: [
      { text: 'Date', align: 'start', sortable: true, value: 'date' },
      { text: 'Unique code', value: 'uniqueCode', sortable: true },
      { text: 'Status', value: 'status', sortable: true }
    ]
  }),

  methods: {
    getDate (request) {
      return new Date(request.modified - 0).toISOString().slice(0, 10)
    },

    getSchedule (data) {
      this.requests = data.map((request, index) => Object.assign(request, { index, date: this.getDate(request), uniqueCode: request.customer.uniqueCode }))
      this.ready = true
    },

    gotoSchedule (data) {
      this.ready = false
      if (data.request === 'booking') this.$router.push({ name: 'booking' })
      if (data.request === 'scheduling') this.$router.push({ name: 'schedule' })
    },

    sendRequestForData () {
      this.__getPendingRequests(this.getSchedule)
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-updates-received', this.sendRequestForData)
  },

  mounted () {
    this.sendRequestForData()
    this.$root.$on('customers-updates-received', this.sendRequestForData)
  }
}
</script>
