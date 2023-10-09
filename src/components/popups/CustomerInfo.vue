<template>
  <v-dialog v-model="dialog" max-width="540" class="pa-4">
    <v-card flat height="480">
      <v-toolbar dark dense color="#999">
        <v-icon class="mr-4"> mdi-account-box </v-icon>
        <v-toolbar-title> Customer details </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="transparent" @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <p style="font-size: 14px !important">Customer name: <b>{{ name }}</b></p>
      </v-card-text>
      <v-card-text class="text-center">
        <p style="font-size: 14px !important">Address: <b>{{ address }}</b></p>
      </v-card-text>
      <v-card-text class="text-center">
        <p style="font-size: 14px !important">Phone: <b>{{ phone }}</b></p>
      </v-card-text>

      <fieldset class="text-center mx-auto px-4 py-2 mb-8" style="height: 140px; width: 420px; border-radius: 4px; border: solid 1px #ddd; overflow-y: auto;">
        <legend class="pb-2"><small>Additional instructions for the technician</small></legend>
        <p style="font-size: 14px !important">
          <b>{{ message }}</b>
        </p>
      </fieldset>

      <v-row justify="center" style="width: 100%">
        <v-btn outlined color="#999" @click="dialog = false">OK</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'CustomerInfo',
  data: () => ({
    name: '',
    address: '',
    phone: '',
    message: '',
    dialog: false
  }),

  methods: {
    open (data) {
      const { name, address, phone, message } = data
      this.name = name
      this.address = address
      this.phone = phone
      this.message = message
      this.dialog = true
    }
  },

  beforeDestroy () {
    this.$root.$off('open-customer-info-popup', this.open)
  },

  mounted () {
    this.$root.$on('open-customer-info-popup', this.open)
  }
}
</script>
