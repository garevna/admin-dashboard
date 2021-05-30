<template>
  <v-card flat class="transparent mx-auto py-5">
    <v-card-text>
        Ticket category: <b>{{ category }}</b>
    </v-card-text>

    <v-card-text>
      Severity: <b>{{ severity }}</b>
    </v-card-text>

    <v-card-text>
        Priority: <b>{{ priority }}</b>
    </v-card-text>

    <v-card-text>
      Subject: <b>{{ subject }}</b>
    </v-card-text>

    <v-card-text v-if="category === 'Customer issue' || category === 'Service issue'">
      Customer: <b>{{ customer }}</b>
    </v-card-text>

    <v-card-text>
      Details <b>{{ details }}</b>
    </v-card-text>

    <v-card-text v-if="contactPhone">
      Contact number of the responsible person <b>{{ contactPhone }}</b>
    </v-card-text>

    <v-row class="mt-12">
      <v-btn outlined small class="mr-4" color="primary" @click="$emit('update:edit', false)">
        Back to tickets list
      </v-btn>
      <v-spacer />
      <v-btn outlined small color="primary" @click="save">
        Update/save details
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'EditTicket',
  props: ['ticket', 'categories', 'newTicket', 'edit'],
  data: () => ({
    severities: ['Low', 'Medium', 'Hight'],
    priorities: ['Low', 'Medium', 'Hight'],
    customersList: null,
    customersIds: null,
    customer: null
  }),
  computed: {
    category: {
      get () {
        return this.ticket.category
      },
      set (val) {
        this.update('category', val)
      }
    },
    severity: {
      get () {
        return this.ticket.severity
      },
      set (val) {
        this.update('severity', val)
      }
    },
    priority: {
      get () {
        return this.ticket.priority
      },
      set (val) {
        this.update('priority', val)
      }
    },
    subject: {
      get () {
        return this.ticket.subject
      },
      set (val) {
        this.update('subject', val)
      }
    },
    details: {
      get () {
        return this.ticket.details
      },
      set (val) {
        this.update('details', val)
      }
    },
    customerId: {
      get () {
        return this.ticket.customerId
      },
      set (val) {
        this.update('customerId', val)
      }
    },
    contactPhone: {
      get () {
        return this.ticket.contactPhone
      },
      set (val) {
        this.update('contactPhone', val)
      }
    }
  },
  watch: {
    customer (val) {
      if (!this.customersList) return
      const index = this.customersList.findIndex(item => item === val)
      if (index === -1) return
      this.customerId = this.customersIds[index]
    }
  },
  methods: {
    fillCustomerList (data) {
      this.customersList = data.result.map(customer => `${customer.apartmentNumber}/${customer.address}`)
      this.customersIds = data.result.map(customer => customer._id)
      const index = this.customersIds.findIndex(item => item === this.ticket.customerId)
      this.customer = index !== -1 ? this.customersList[index] : null
    },
    postNewTicket () {
      this.__postNewTicket(this.ticket)
    },
    updateTicket () {
      this.update('modified', new Date().toISOString().slice(0, 10))
      this.__saveTicketData(this.ticket._id, this.ticket)
    },
    save () {
      this.newTicket ? this.postNewTicket() : this.updateTicket()
    },
    callback (data) {
      this.customerName = `${data.apartmentNumber}/${data.address} (${data.firstName} ${data.lastName})`
    },
    update (prop, value) {
      this.$emit('update:ticket', Object.assign({}, this.ticket, { [prop]: value }))
    }
  },
  mounted () {
    this.$root.$on('customers-list-received', this.fillCustomerList)
    this.__getCustomers()
    // this.$root.$on('customer-data-received', this.callback)
    // if (this.newTicket) {
    //   this.ticket = ticketSchema
    // }
  }
}
</script>
