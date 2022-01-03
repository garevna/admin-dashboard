<template>
  <v-container>
    <v-card v-if="ready" flat class="transparent" max-height="320" style="overflow-y: auto">
      <v-data-table
        :headers="headers"
        :items="requests"
        :items-per-page="requests.length"
        hide-default-header
        hide-default-footer
        dense
        sort-by="date"
        :sort-desc.sync="sortDesc"
        @click:row="gotoSchedule"
      />
      <!-- <table v-if="!goToSchedule">
        <tbody>
          <tr v-for="(request, index) of requests" :key="index" @click="gotoSchedule(request)">
            <td>
              <small><sup>{{ (new Date(request.modified - 0)).toISOString().slice(0, 10) }}</sup></small>
            </td>
            <td class="px-4">
              <small><strong>{{ request.customer.uniqueCode }}</strong></small>
            </td>
            <td>
              <small>{{ request.status }}</small>
            </td>
          </tr>
        </tbody>
      </table> -->
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
      { text: '', align: 'start', sortable: true, value: 'date' },
      { text: '', value: 'uniqueCode' },
      { text: '', value: 'status' }
    ]
  }),

  methods: {
    getDate (request) {
      return new Date(request.modified - 0).toISOString().slice(0, 10)
    },
    getSchedule (data) {
      this.requests = data.map(request => Object.assign(request, { date: this.getDate(request), uniqueCode: request.customer.uniqueCode }))
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

  updated () {
    // console.log('SCHEDULE UPDATED!')
    // this.__getPendingRequests(this.getSchedule)
  },

  beforeDestroy () {
    this.$root.$off('customers-updated-remotelly', this.sendRequestForData)
  },

  mounted () {
    this.__getPendingRequests(this.getSchedule)
    this.$root.$on('customers-updated-remotelly', this.sendRequestForData)
  }
}
</script>
