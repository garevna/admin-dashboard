<template>
  <v-card flat class="transparent mx-auto py-5" width="800">
    <v-toolbar flat style="background: #eee">
      RSP: <b>{{ ticket.resellerName }}</b>
      <v-spacer />
      Subject: <b>{{ ticket.subject }}</b>
    </v-toolbar>
    <v-row justify="end" class="mr-4">
      <table class="mt-5">
        <thead>
          <tr>
            <th>Severity</th>
            <th width="48"></th>
            <th>Priority</th>
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

    <v-card-text v-if="ticket.category === 'Customer issue' || ticket.category === 'Service issue'" class="mt-5">
      Customer: <b>{{ ticket.customer.uniqueCode }}</b>
      <b>{{ ticket.customer.apartmentNumber }}/{{ ticket.customer.address }}</b>
    </v-card-text>

    <v-card flat class="my-5 pa-4" width="100%" style="background: #eee; padding: 16px; border-radius: 4px;">
      <table width="100%">
        <thead>
          <tr v-if="ticket.history && ticket.details">
            <th width="400">
              Incoming
            </th>
            <th width="400">
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
          <tr>
            <td style="text-align: right">
              <small style="padding-right: 16px">Send answer:</small>
            </td>
            <td>
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
</template>

<script>

export default {
  name: 'EditTicket',

  props: ['ticket', 'categories', 'edit'],

  data: () => ({
    response: ''
  }),

  computed: {
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

      this.__saveTicketData(this.ticket)

      this.$emit('update:edit', false)
    }
  }
}
</script>

<style>

.v-select__selection--comma {
  font-size: 14px;
}

/* table {
  width: 100%;
  border-collapse: collapse;
} */
th, td {
  /* border: solid 1px #ddd; */
  /* border-radius: 4px; */
  /* padding: 8px 16px;
  text-align: center; */
}

b {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  text-align: center;
  margin-left: 8px;
}

fieldset {
  border: solid 1px #ccc;
}

.v-label {
  font-size: 14px!important;
}
</style>

<style scoped>
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
