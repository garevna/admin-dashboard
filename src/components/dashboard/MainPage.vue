<template>
  <v-container class="homefone" v-if="available">
    <v-row v-if="!showTicketDetails">
      <v-col cols="6">
        <Fieldset legend="Pending tickets">
          <PendingTickets :edit.sync="showTicketDetails" :ticket.sync="selectedTicket" />
        </Fieldset>
      </v-col>
      <v-col cols="6">
        <Fieldset legend="Pending connection requests">
          <PendingConnectionRequests />
        </Fieldset>
      </v-col>
    </v-row>

    <v-row v-if="!showTicketDetails">
      <v-col cols="6">
        <Fieldset legend="Responses on details update request">
          <PartnersResposes />
        </Fieldset>
      </v-col>
      <v-col cols="6">
        <Fieldset legend="Messages / responses from RSP">
        </Fieldset>
      </v-col>
    </v-row>

    <v-row  v-if="showTicketDetails">
      <TicketDetails
        :ticket="selectedTicket"
        :category="selectedTicket.category"
        :edit.sync="showTicketDetails"
      />
    </v-row>
  </v-container>
</template>

<script>

import { roleHandler } from '@/controllers/data-handlers'

import Fieldset from '@/components/Fieldset.vue'
import PendingTickets from '@/components/dashboard/PendingTickets.vue'
import PendingConnectionRequests from '@/components/dashboard/PendingConnectionRequests.vue'
import PartnersResposes from '@/components/dashboard/PartnersResposes.vue'

export default {
  name: 'MainPage',

  components: {
    Fieldset,
    PendingTickets,
    PendingConnectionRequests,
    PartnersResposes,
    TicketDetails: () => import('@/components/tickets/TicketDetails.vue')
  },

  data: () => ({
    available: false,
    role: roleHandler(),
    showTicketDetails: false,
    selectedTicket: null
  }),

  beforeMount () {
    this.available = roleHandler() === 'SuperAdmin' || roleHandler() === 'admin'
  }
}
</script>
