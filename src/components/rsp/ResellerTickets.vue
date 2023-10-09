<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready" min-width="900" max-width="1440">
    <v-row align="start" justify="center" v-if="!edit">
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          class="transparent"
          :footer-props="{
            showFirstLastPage: false,
            itemsPerPageText: ''
          }"
          @click:row="editItem"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              v-if="unread(item)"
              small
              color="primary"
              class="mr-2"
            >
              mdi-email-mark-as-unread
            </v-icon>
          </template>

          <template v-slot:top>
            <v-row>
              <v-select
                :items="categories"
                label="Categories"
                v-model="category"
                outlined
                dense
                clearable
                :menu-props="{ bottom: true, offsetY: true }"
                style="max-width: 180px"
              ></v-select>

              <v-select
                :items="severities"
                label="Severity"
                v-model="severity"
                outlined
                dense
                clearable
                :menu-props="{ bottom: true, offsetY: true }"
                style="max-width: 160px"
              ></v-select>

              <v-select
                :items="priorities"
                label="Priority"
                v-model="priority"
                outlined
                dense
                clearable
                :menu-props="{ bottom: true, offsetY: true }"
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
                clearable
                :menu-props="{ bottom: true, offsetY: true }"
                class="transparent ml-12 mr-0 pb-12 mb-12"
              ></v-text-field>
            </v-row>
          </template>

          <template v-slot:footer.prepend>
            <v-text-field
              outlined
              dense
              hide-details
              prepend-icon="mdi-magnify"
              style="max-width: 300px"
            />
          </template>
        </v-data-table>
    </v-row>
    <v-row v-else>
      <TicketDetails
        :ticket.sync="selectedTicket"
        :edit.sync="edit"
      />
    </v-row>
  </v-card>
</template>

<script>

import { partnerDetailsHandler } from '@/controllers'

export default {
  name: 'ResellerTickets',

  components: {
    TicketDetails: () => import('@/components/tickets/TicketDetails.vue')
  },

  props: ['details'],

  data: () => ({
    ready: false,
    edit: false,
    tickets: null,
    selectedTicket: null,
    search: null,
    category: null,
    categories: null,
    dates: [],
    headers: [
      { text: '', value: 'actions' },
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

  watch: {
    edit (newVal, oldVal) {
      if (!newVal && oldVal) {
        this.sendRequestForTickets()
      }
    }
  },

  methods: {
    sendRequestForTickets () {
      this.__getTicketsOfPartner(partnerDetailsHandler()._id, this.getTickets)
    },

    unread (ticket) {
      if (!ticket.history?.length) return false

      const { source, read = false } = ticket.history.slice(-1)[0]
      return source === 'partner' && !read
    },

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
      this.__getTicketById(item._id, this.showTicketDetails)
    },

    showTicketDetails (data) {
      this.selectedTicket = data
      this.edit = true
    }
  },

  beforeDestroy () {
    this.$root.$off('tickets-updates-received', this.sendRequestForTickets)
  },

  mounted () {
    this.$root.$on('tickets-updates-received', this.sendRequestForTickets)
  },

  beforeMount () {
    this.__getTicketCategories(this.getCategories)
    this.__getTicketsOfPartner(partnerDetailsHandler()._id, this.getTickets)
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
