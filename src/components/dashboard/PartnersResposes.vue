<template>
  <v-container>
    <v-card v-if="ready" flat class="transparent" max-height="320" style="overflow-y: auto">
      <v-data-table
        :headers="headers"
        :items="messages"
        :items-per-page="messages.length"
        hide-default-header
        hide-default-footer
        dense
        sort-by="date"
        :sort-desc.sync="sortDesc"
        @click:row="getMessageDetails"
        no-data-text="No responses from partners"
      />
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'PartnersResposes',

  props: ['edit', 'mesage'],

  data: () => ({
    ready: false,
    stop: false,
    tickets: null,
    currentTicket: null,
    sortDesc: true,
    headers: [
      { text: '', align: 'start', sortable: true, value: 'date', width: '320px' },
      { text: 'Partner', value: 'partner', width: '480' },
      { text: '', value: 'subject', width: 480 }
    ],
    showPartnerDetails: false,
    partnerDetails: null
  }),

  methods: {
    sendRequestForMessages () {
      if (this.stop) return
      this.__getUpdatedMessages(this.getMessages)
      setTimeout(this.sendRequestForMessages, 30000)
    },

    getMessages (data) {
      this.ready = false
      this.messages = this.__clone(data.map(message => Object.assign(message, ({ date: new Date(message.modified - 0).toISOString().slice(0, 10) }))))
      this.$nextTick(() => { this.ready = true })
    },

    gotoMessageDetails (data) {
      this.$emit('update:message', data)
      this.$emit('update:edit', true)
    },

    getMessageDetails (message) {
      window[Symbol.for('message-from-partner.id')] = message.resellerId
      this.$router.push({ name: 'rsp-list' })
    }
  },

  beforeDestroy () {
    this.stop = true
  },

  mounted () {
    this.sendRequestForMessages()
  }
}
</script>

<style>
td {
  font-size: 13px !important;
}
</style>
