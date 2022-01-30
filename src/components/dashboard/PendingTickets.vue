<template>
  <v-container>
    <v-card v-if="ready" flat class="transparent" max-height="320" style="overflow-y: auto">
      <v-data-table
        :headers="headers"
        :items="tickets"
        :items-per-page="tickets.length"
        hide-default-header
        hide-default-footer
        dense
        sort-by="date"
        :sort-desc.sync="sortDesc"
        @click:row="getTicketDetails"
      />
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'PendingTickets',

  props: ['edit', 'ticket'],

  data: () => ({
    ready: false,
    stop: false,
    tickets: null,
    currentTicket: null,
    sortDesc: true,
    headers: [
      { text: '', align: 'start', sortable: true, value: 'date', width: 150 },
      { text: '', value: 'number' },
      { text: '', value: 'subject' }
    ]
  }),

  methods: {
    sendRequestToRefresh () {
      this.__refreshTickets(this.sendRequestForTickets)
    },

    sendRequestForTickets () {
      this.__getPendingTickets(this.getTickets)
    },

    getTickets (data) {
      this.tickets = data.map(ticket => Object.assign(ticket, ({ date: new Date(ticket.modified - 0).toISOString().slice(0, 10) })))
      this.ready = true
    },

    gotoTicketDetails (data) {
      this.$emit('update:ticket', data)
      this.$emit('update:edit', true)
    },

    getTicketDetails (ticket) {
      this.ready = false
      this.__getTicketById(ticket._id, this.gotoTicketDetails)
    }
  },

  beforeDestroy () {
    this.$root.$off('tickets-updates-received', this.sendRequestForTickets)
  },

  mounted () {
    this.sendRequestToRefresh()
    this.$root.$on('tickets-updates-received', this.sendRequestForTickets)
  }
}
</script>

<style>
td {
  font-size: 13px !important;
}
</style>
