<template>
  <v-card flat class="transparent mx-auto py-5" width="600">
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
        <!-- Ticket category: <b>{{ ticket.category }}</b>
        Severity: <b>{{ ticket.severity }}</b>
        Priority: <b>{{ ticket.priority }}</b> -->
    </v-card-text>

    <hr />

    <!-- <v-card-text>
      Severity: <b>{{ ticket.severity }}</b>
    </v-card-text> -->

    <!-- <v-card-text>
        Priority: <b>{{ ticket.priority }}</b>
    </v-card-text> -->

    <v-card-text>
      Subject: <b>{{ ticket.subject }}</b>
    </v-card-text>

    <hr />

    <v-card-text>
      RSP: <b>{{ ticket.resellerName }}</b>
    </v-card-text>

    <v-card-text v-if="ticket.category === 'Customer issue' || ticket.category === 'Service issue'">
      Customer: <b>{{ ticket.customer.uniqueCode }}</b>
      <p><small>{{ ticket.customer.apartmentNumber }}/{{ ticket.customer.address }}</small></p>
    </v-card-text>

    <v-card-text>
      Details
      <v-icon> mdi-message-arrow-right </v-icon> <b>{{ ticket.details }}</b>
    </v-card-text>

    <v-card-text v-if="dialog">
      <!-- <v-icon> mdi-message-arrow-right </v-icon>
      <b> {{ new Date(ticket.created - 0).toISOString().slice(0, 10) }} </b>
      <b>{{ ticket.details }}</b> -->
      <p v-for="message of dialog" :key="message.date">
        <v-icon v-if="message.source === 'admin'"> mdi-message-arrow-left </v-icon>
        <v-icon v-else> mdi-message-arrow-right </v-icon>
        <small>
          {{ new Date(message.date).toISOString().slice(0, 10) }}
          {{ message.message }}
        </small>
      </p>
    </v-card-text>

    <v-card-text v-if="ticket.contactPhone">
      Contact number of the responsible person <b>{{ ticket.contactPhone }}</b>
    </v-card-text>

    <v-card-text>
      <v-textarea label="Response" v-model="response" outlined />
    </v-card-text>

    <v-row class="mt-12">
      <v-btn outlined small class="mr-4" color="primary" @click="$emit('update:edit', false)">
        Back to tickets list
      </v-btn>
      <v-spacer />
      <v-btn outlined small color="primary" @click="updateTicket" v-if="response">
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
    // severities: ['Low', 'Medium', 'Hight'],
    // priorities: ['Low', 'Medium', 'Hight']
  }),
  computed: {
    dialog () {
      return this.ticket.files.filter(item => item.type === 'dialog')
    }
  },
  methods: {
    updateTicket () {
      this.$emit('update:ticket', Object.assign({}, this.ticket, { modified: new Date().toISOString().slice(0, 10) }))
      this.__saveTicketData(this.ticket._id, { modified: Date.now(), response: this.response })
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

</style>
