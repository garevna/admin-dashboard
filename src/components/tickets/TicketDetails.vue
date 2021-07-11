<template>
  <v-card flat class="transparent mx-auto py-5" width="800">
    <v-toolbar class="transparent">
      RSP: <b>{{ ticket.resellerName }}</b>
      <v-spacer />
      Subject: <b>{{ ticket.subject }}</b>
    </v-toolbar>
    <v-card-text>
      <table>
        <thead>
          <tr>
            <td>Ticket category</td>
            <td>Severity</td>
            <td>Priority</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>{{ ticket.category }}</b></td>
            <td><b>{{ ticket.severity }}</b></td>
            <td><b>{{ ticket.priority }}</b></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>

    <v-card-text v-if="ticket.category === 'Customer issue' || ticket.category === 'Service issue'">
      Customer: <b>{{ ticket.customer.uniqueCode }}</b>
      <b><small>{{ ticket.customer.apartmentNumber }}/{{ ticket.customer.address }}</small></b>
    </v-card-text>

    <fieldset class="mt-5 pt-8 px-4">
      <legend class="transparent mx-4"><strong>Details</strong></legend>
      <v-card-text>
        <v-icon> mdi-message-arrow-right </v-icon>
        <sup>{{ new Date(ticket.created - 0).toISOString().slice(0, 10) }}</sup>
        <b>{{ ticket.details }}</b>
      </v-card-text>

      <v-card-text v-if="dialog">
        <p v-for="message of dialog" :key="message.date">
          <v-icon v-if="message.source === 'admin'"> mdi-message-arrow-left </v-icon>
          <v-icon v-else> mdi-message-arrow-right </v-icon>
          <small>
            <sup>{{ new Date(message.date).toISOString().slice(0, 10) }}</sup>
            <b>{{ message.message }}</b>
          </small>
        </p>
      </v-card-text>

      <v-card-text>
        <v-textarea label="Response" v-model="response" outlined />
      </v-card-text>
    </fieldset>

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
  methods: {
    updateTicket () {
      this.$emit('update:ticket', Object.assign({}, this.ticket, { modified: new Date().toISOString().slice(0, 10) }))
      // console.log(this.ticket._id)
      this.__saveTicketData(this.ticket._id, this.response)
    }
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  /* border: solid 1px #ddd; */
  /* border-radius: 4px; */
  padding: 8px 16px;
  text-align: center;
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

</style>
