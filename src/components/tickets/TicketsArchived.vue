<template>
  <v-card flat class="transparent pb-12 px-12" min-width="960" max-width="1440">
    <v-toolbar flat class="transparent my-12">
      <v-toolbar-title>
        <strong>Tickets</strong>
      </v-toolbar-title>
      <v-spacer />
      <p class="mr-4">
        <strong>
          Archive
        </strong>
      </p>
    </v-toolbar>
    <v-container>
      <v-row align="start" justify="center" v-if="!edit">
        <v-col cols="12" md="5" lg="4" xl="3">
          <v-date-picker
            v-model="picker"
            type="month"
            :allowed-dates="allowedMonths"
            color="#900"
            elevation="2"
            style="margin-top: -32px"
          />
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            dense
            clearable
            hide-details
            append-icon="mdi-magnify"
            outlined
            class="transparent mt-5"
            style="max-width: 290px"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="7" lg="8">
          <v-data-table
            v-if="ready"
            :headers="headers"
            :items="filteredItems"
            :search="search"
            class="transparent"
            @click:row="editItem"
          >
            <template v-slot:top>
              <Filters
                :customersList="customersList"
                :customer.sync="customer"
                :severity.sync="severity"
                :priority.sync="priority"
              />
            </template>

            <!-- <template v-slot:footer.prepend>
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                dense
                clearable
                hide-details
                append-icon="mdi-magnify"
                outlined
                class="transparent mt-2"
                style="max-width: 280px"
              ></v-text-field>
            </template> -->
          </v-data-table>
        </v-col>
      </v-row>
      <v-row v-else>
        <TicketDetails
          :ticket.sync="selectedTicket"
          :edit.sync="edit"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  name: 'TicketsArchived',

  components: {
    TicketDetails: () => import('@/components/tickets/TicketDetails.vue'),
    Filters: () => import('@/components/tickets/Filters.vue')
  },

  data: () => ({
    ready: false,
    edit: false,
    section: '',
    tickets: null,
    selectedTicket: null,
    search: null,
    customersList: [],
    customer: null,
    dates: [],
    headers: [
      { text: 'Number', align: 'start', value: 'number' },
      { text: 'Subject', align: 'start', value: 'subject' },
      { text: 'Date (created)', value: 'created' },
      { text: 'Date (modified)', value: 'modified' },
      { text: 'Category', value: 'category' },
      { text: 'Priority', value: 'priority' },
      { text: 'Severity', value: 'severity' }
    ],
    answer: '',
    severity: null,
    priority: null,

    buttonText: 'Show archived tickets',
    picker: new Date().toISOString().substr(0, 7),
    month: new Date().getMonth() + 1
  }),

  computed: {
    filteredItems () {
      if (!(this.customer || this.severity || this.priority)) return this.tickets
      return this.tickets
        .filter(ticket => !this.customer || (ticket.customerId === this.customer))
        .filter(ticket => !this.severity || (ticket.severity === this.severity))
        .filter(ticket => !this.priority || (ticket.priority === this.priority))
    }
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler (data) {
        this.sendRequest(this.year, this.month)
      }
    },

    picker (value) {
      const [year, month] = value.split('-')
      this.sendRequest(year.slice(-2), month)
    }
  },

  methods: {
    allowedMonths (val) {
      return val.split('-')[1] <= this.month
    },

    sendRequest (year, month) {
      this.ready = false
      this.__getArchivedTickets(year, month, this.getTickets)
      this.customer = null
      this.severity = null
      this.priority = null
    },

    getTickets (data) {
      const getDate = date => date.indexOf('-') !== -1 ? date : new Date(date - 0).toISOString().slice(0, 10)

      this.tickets = data.map(ticket => Object.assign({}, ticket, {
        created: getDate(ticket.created),
        modified: getDate(ticket.modified)
      }))

      const list = Array.from(new Set(this.tickets.map(ticket => ticket.customerId)))

      this.__getFilteredShortListOfCustomers(list, this.getCustomersList)

      this.ready = true
    },

    editItem (item) {
      this.__getArchivedTicketDetails(item._id, this.showTicketDetails)
    },

    showTicketDetails (data) {
      this.selectedTicket = data
      this.edit = true
    },

    getCustomersList (data) {
      this.customersList = data
    }
  },

  beforeDestroy () {
    // this.$root.$off('ticket-data-received', this.showTicketDetails)

    // this.$root.$off('customers-filtered-short-list-received', this.getCustomersList)
  },

  beforeMount () {
    // this.$root.$on('ticket-data-received', this.showTicketDetails)

    // this.$root.$on('customers-filtered-short-list-received', this.getCustomersList)
  }
}
</script>

<style scoped>

.theme--light.v-card {
  background: #fbfbfb;
}
.border {
  border: 1px solid #881F1A;
}
.search-field {
  margin-top: -64px;
}
@media screen and (max-width: 960px) {
  .search-field {
    margin-top: 8px;
  }
}
</style>
