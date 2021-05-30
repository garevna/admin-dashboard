<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready" min-width="900" max-width="1440">
    <v-row align="start" justify="center" v-if="!edit">
      <!-- <v-col cols="12" md="4" lg="3" xl="2" class="text-center mt-4">
        <fieldset class="field-set">
          <legend>
            Ticket category
          </legend>
          <v-list dense class="transparent mb-12">
            <v-list-item-group
              v-model="category"
              color="primary"
              class="transparent"
              active-class="border"
            >
              <v-list-item
                v-for="(item, i) in categories"
                :key="i"
              >
                <v-list-item-content @click="category = item">
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-btn text dark class="primary mt-4 mx-auto" outlined @click="createNewTicket">Create a ticket</v-btn>
        </fieldset>
      </v-col> -->

      <!-- <v-col cols="12" md="9" lg="8" xl="6"> -->

        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          class="transparent"
        >

          <template v-slot:top>
            <v-row>
              <v-select
                :items="categories"
                label="Categories"
                v-model="category"
                outlined
                dense
              ></v-select>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                dense
                hide-details
                append-icon="mdi-magnify"
                outlined
                class="transparent ml-12 mr-0 pb-12 mb-12"
              ></v-text-field>
            </v-row>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn outlined @click="editItem(item)" dark class="primary">Details</v-btn>
          </template>
        </v-data-table>
      <!-- </v-col> -->
    </v-row>
    <v-row v-else>
      <TicketDetails
        :ticket.sync="selectedTicket"
        :categories="categories"
        :edit.sync="edit"
        :newTicket="newTicket"
      />
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'Tickets',
  components: {
    TicketDetails: () => import('@/components/tickets/TicketDetails.vue')
  },
  data: () => ({
    ready: false,
    edit: false,
    newTicket: false,
    tickets: null,
    selectedTicket: null,
    search: null,
    category: null,
    categories: null,
    headers: [
      {
        text: 'Subject',
        align: 'start',
        value: 'subject'
      },
      { text: 'Date (created)', value: 'created' },
      { text: 'Date (modified)', value: 'modified' },
      { text: 'Category', value: 'category' },
      { text: 'Priority', value: 'priority' },
      { text: 'Severity', value: 'severity' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    filteredItems () {
      if (!this.category || this.category === '...') return this.tickets
      return this.tickets
        .filter(ticket => !this.category || (ticket.category === this.category))
    }
  },
  methods: {
    getCategories (data) {
      console.log(data)
      this.categories = data
    },
    getTickets (data) {
      const getDate = date => date.indexOf('-') !== -1 ? date : new Date(date - 0).toISOString().slice(0, 10)

      this.tickets = data.map(ticket => Object.assign({}, ticket, {
        created: getDate(ticket.created),
        modified: getDate(ticket.modified)
      }))

      this.ready = true
    },
    createNewTicket () {
      const { ticketSchema } = require('@/configs/ticketSchema')
      this.selectedTicket = ticketSchema
      this.selectedTicket.created = new Date().toISOString().slice(0, 10)
      this.selectedTicket.modified = new Date().toISOString().slice(0, 10)
      this.edit = true
      this.newTicket = true
    },
    editItem (item) {
      this.selectedTicket = item
      this.edit = true
      this.newTicket = false
    }
  },

  beforeDestroy () {
    this.$root.$off('categories-received', this.getCategories)
    this.$root.$off('tickets-list-received', this.getTickets)
  },

  beforeMount () {
    this.$root.$on('categories-received', this.getCategories)
    this.$root.$on('tickets-list-received', this.getTickets)
    this.__getCategories()
    this.__getTickets()
  }
}
</script>

<style scoped>
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
