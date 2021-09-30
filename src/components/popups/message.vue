<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="#999">
        <v-icon class="mr-4"> $message </v-icon>
        <v-toolbar-title> Message </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="transparent" @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>{{ messageType || '' }}</h4>
      </v-card-text>
      <v-card-text class="text-center">
        <p v-html="messageText"></p>
      </v-card-text>

      <v-card-text class="text-center">
        <v-btn outlined @click="dialog = false" class="my-4">OK</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

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
    },
    open (data) {
      this.message = true
      this.messageType = data.messageType
      this.messageText = data.messageText
    }
  },

  beforeDestroy () {
    this.$root.$off('open-message-popup', this.open)
  },

  mounted () {
    this.$root.$on('open-message-popup', this.open)
  }
}
</script>
