<template>
  <v-container>
    <v-row v-if="!editCustomerDetails" align="start" justify="center">
      <v-card flat class="transparent mx-auto py-5" width="800">
        <v-toolbar flat style="background: #efefef">
          <small>Ticket</small> <b class="bold-item">{{ ticket.number }}</b>
          <v-spacer />
          <small>RSP:</small> <b class="bold-item">{{ ticket.resellerName }}</b>
          <v-spacer />
          <small>Subject:</small> <b class="bold-item">{{ ticket.subject }}</b>
          <v-spacer />
          <v-btn icon @click="$emit('update:edit', false)">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row justify="end" class="mr-4">
          <table class="mt-5">
            <thead>
              <tr>
                <th><small>Severity</small></th>
                <th width="48"></th>
                <th><small>Priority</small></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ ticket.severity }}</td>
                <td></td>
                <td>{{ ticket.priority }}</td>
              </tr>
            </tbody>
          </table>
        </v-row>

        <v-card-text
          v-if="customerDetailsAvailable"
          class="mt-5"
          @click="editCustomerDetails = true"
        >
          Customer: <b class="bold-item show-customer-details">{{ ticket.customer.uniqueCode }}</b>
          <b class="bold-item show-customer-details">{{ ticket.customer.apartmentNumber }}/{{ ticket.customer.address }}</b>
        </v-card-text>

        <v-card flat class="my-5 pa-4" width="100%" style="background: #eee; padding: 16px; border-radius: 4px;">
          <table width="100%">
            <thead>
              <tr>
                <th width="400">
                  <v-icon>mdi-transfer-down</v-icon>
                  Incoming
                </th>
                <th width="400">
                  <v-icon>mdi-transfer-up</v-icon>
                  Outgoing
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of ticket.history" :key="item.date">
                <td class="message">
                  <span v-if="item.source !== 'admin'">
                    <small>{{ new Date(item.date).toISOString().slice(0, 10) }}</small><br>
                    <small>{{ item.message }}</small>
                  </span>
                </td>
                <td class="message">
                  <span v-if="item.source === 'admin'">
                    <small>{{ new Date(item.date).toISOString().slice(0, 10) }}</small><br>
                    <small>{{ item.message }}</small>
                  </span>
                </td>
              </tr>
              <tr v-if="ticket.history && ticket.details">
                <td><hr class="my-5"></td>
                <td><hr class="my-5"></td>
              </tr>
              <tr v-if="ticket.status !== 'Archived'">
                <td style="text-align: right">
                  <small style="padding-right: 16px">Send answer:</small>
                </td>
                <td v-if="ticket.status !== 'Archived'">
                  <span>
                    <small>{{ new Date().toISOString().slice(0, 10) }}</small><br>
                    <v-text-field v-model="response" outlined />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>

        <v-card-text v-if="ticket.contactPhone">
          Contact number of the responsible person <b>{{ ticket.contactPhone }}</b>
        </v-card-text>

        <v-row class="mt-12">
          <v-btn outlined small class="mr-4" color="primary" @click="$emit('update:edit', false)">
            Back to tickets list
          </v-btn>
          <v-spacer />
          <v-btn dark small color="primary" @click="updateTicket" v-if="response">
            Update/save details
          </v-btn>
        </v-row>
      </v-card>
    </v-row>

    <v-row v-else align="start" justify="center">
      <ShowCustomerDetails
        v-if="customerDetailsAvailable"
        :dialog.sync="editCustomerDetails"
        :customerId="ticket.customerId"
      />
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'TicketDetails',

  props: ['ticket', 'categories', 'edit'],

  components: {
    ShowCustomerDetails: () => import('@/components/customers/ShowCustomerDetails.vue')
  },

  data: () => ({
    response: '',
    editCustomerDetails: false,
    customer: null
  }),

  computed: {
    customerDetailsAvailable () {
      return (this.ticket.category === 'Customer issue' || this.ticket.category === 'Service issue') && this.ticket.customerId
    },
    dialog () {
      return this.ticket.history
    }
  },

  watch: {
    $route: {
      deep: true,
      handler (data) {
        this.$emit('update:edit', false)
      }
    },
    ticket: {
      deep: true,
      handler (val) {
        //
      }
    }
  },

  methods: {
    updateTicket () {
      this.$emit('update:ticket', Object.assign({}, this.ticket, { modified: new Date().toISOString().slice(0, 10) }))

      this.ticket.history.push({
        date: Date.now(),
        source: 'admin',
        message: this.response
      })

      this.__saveTicketData(this.ticket, this.updated)
    },

    updated () {
      this.$emit('update:edit', false)
    }
  }
}
</script>

<style>

.v-select__selection--comma {
  font-size: 14px;
}

.show-customer-details:hover {
  color: #900;
  cursor: pointer;
}
</style>

<style scoped>

fieldset {
  border: solid 1px #ccc;
}

.bold-item {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  text-align: center;
  margin-left: 8px;
}

.customer-info {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 16px;
}

td.message {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
