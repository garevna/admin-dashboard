<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready" min-width="900" max-width="1440">
    <v-row align="start" justify="center" v-if="!edit">
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          class="transparent"
          @click:row="editItem"
        >

          <template v-slot:top>
            <v-row>
              <v-select
                :items="categories"
                label="Categories"
                v-model="category"
                outlined
                dense
                style="max-width: 180px"
              ></v-select>

              <v-select
                :items="severities"
                label="Severity"
                v-model="severity"
                outlined
                dense
                clearable
                style="max-width: 160px"
              ></v-select>

              <v-select
                :items="priorities"
                label="Priority"
                v-model="priority"
                outlined
                dense
                style="max-width: 160px"
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

          <!-- <template v-slot:item.actions="{ item }">
            <v-btn outlined @click="editItem(item)" dark class="primary">Details</v-btn>
          </template> -->
        </v-data-table>
      <!-- </v-col> -->
    </v-row>
    <v-row v-else>
      <TicketDetails
        :ticket.sync="selectedTicket"
        :edit.sync="edit"
      />
      <!-- <v-card-text>
        Answer
        <v-textarea v-model="answer" />
        <v-btn @click="updateTicket()">
          Update
        </v-btn>
      </v-card-text> -->
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
    dates: [],
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
      { text: 'Status', value: 'status' }
    ],
    answer: '',
    severities: ['Low', 'Medium', 'Hight'],
    priorities: ['Low', 'Medium', 'Hight'],
    severity: null,
    priority: null
  }),
  computed: {
    filteredItems () {
      if (!(this.category || this.severity || this.priority) || this.category === '...') return this.tickets
      return this.tickets
        .filter(ticket => !this.category || (ticket.category === this.category))
        .filter(ticket => !this.severity || (ticket.severity === this.severity))
        .filter(ticket => !this.priority || (ticket.priority === this.priority))
    }
  },
  methods: {
    getCategories (data) {
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
    editItem (item) {
      this.__getTicketById(item._id)
    },
    showTicketDetails (data) {
      this.selectedTicket = data
      this.edit = true
    }
  },

  beforeDestroy () {
    this.$root.$off('categories-received', this.getCategories)
    this.$root.$off('tickets-list-received', this.getTickets)
    this.$root.$off('ticket-data-received', this.showTicketDetails)
  },

  beforeMount () {
    this.$root.$on('categories-received', this.getCategories)
    this.$root.$on('tickets-list-received', this.getTickets)
    this.$root.$on('ticket-data-received', this.showTicketDetails)
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
