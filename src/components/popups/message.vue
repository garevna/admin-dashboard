<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="#999">
        <v-icon class="mr-4"> $message </v-icon>
        <v-toolbar-title> Message </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>{{ messageType || '' }}</h4>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ messageText }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import { messageHandler } from '@/controllers/data-handlers'

export default {
  name: 'MessagePopup',
  data: () => ({
    message: false,
    messageType: '',
    messageText: ''
  }),
  computed: {
    dialog: {
      get () {
        return this.message
      },
      set (val) {
        !val && this.resetMessage()
      }
    }
  },
  methods: {
    resetMessage () {
      this.message = false
      this.messageType = ''
      this.messageText = ''
    }
  },
  mounted () {
    this.$root.$on('open-message-popup', function (data) {
      const { messageType, messageText } = messageHandler()
      if (messageType === data.messageType && messageText === data.messageText) return this.resetMessage()
      messageHandler({
        messageType: data.messageType,
        messageText: data.messageText
      })
      this.message = true
      this.messageType = data.messageType
      this.messageText = data.messageText
    }.bind(this))
  }
}
</script>
